import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from '../App.jsx';
import { createAppStore } from '../store.js';
import { categories, products } from '../ProductList.jsx';
import { addItem, updateQuantity, selectTotalCost } from '../CartSlice.jsx';

function setup(page = '') {
  window.history.replaceState({}, '', page ? `/#${page}` : '/');
  const store = createAppStore();
  const user = userEvent.setup();
  render(<Provider store={store}><App /></Provider>);
  return { store, user };
}

describe('Paradise Nursery shopping flow', () => {
  it('opens the landing page and displays all 18 products in three categories', async () => {
    const { user } = setup();
    expect(screen.getByRole('heading', { name: /Welcome to Paradise Nursery/i })).toBeInTheDocument();
    expect(screen.getByText(/We are a plant shop/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Get Started' }));
    expect(screen.getAllByTestId('product-card')).toHaveLength(18);
    expect(new Set(products.map((plant) => plant.id)).size).toBe(18);
    for (const category of categories) {
      expect(category.plants).toHaveLength(6);
      const section = screen.getByRole('region', { name: category.name });
      expect(within(section).getAllByRole('article')).toHaveLength(6);
      for (const plant of category.plants) {
        const card = within(section).getByRole('article', { name: plant.name });
        expect(within(card).getByRole('img', { name: plant.name })).toHaveAttribute('src');
        expect(within(card).getByText(`$${plant.price.toFixed(2)}`)).toBeInTheDocument();
      }
    }
  });

  it('adds plants, disables added buttons, and keeps quantities and costs in sync', async () => {
    const { user } = setup('plants');
    await user.click(screen.getByRole('button', { name: 'Add Snake Plant to cart' }));
    await user.click(screen.getByRole('button', { name: 'Add ZZ Plant to cart' }));
    expect(screen.getByRole('button', { name: 'Snake Plant added to cart' })).toBeDisabled();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    await user.click(screen.getByRole('link', { name: 'Cart, 2 items' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$44.00');
    await user.click(screen.getByRole('button', { name: 'Increase Snake Plant quantity' }));
    expect(screen.getByTestId('quantity-snake-plant')).toHaveTextContent('2');
    expect(screen.getByTestId('subtotal-snake-plant')).toHaveTextContent('$40.00');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('summary-quantity')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$64.00');
    await user.click(screen.getByRole('button', { name: 'Decrease Snake Plant quantity' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$44.00');
    await user.click(screen.getByRole('button', { name: 'Delete ZZ Plant' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$20.00');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    await user.click(screen.getByRole('button', { name: 'Checkout' }));
    expect(screen.getByRole('status')).toHaveTextContent('Coming Soon!');
    await user.click(screen.getByRole('button', { name: 'Continue Shopping' }));
    expect(screen.getByRole('button', { name: 'Add ZZ Plant to cart' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Snake Plant added to cart' })).toBeDisabled();
  });

  it('removes the final unit on decrease and allows the plant to be added again', async () => {
    const { user } = setup('plants');
    await user.click(screen.getByRole('button', { name: 'Add Aloe Vera to cart' }));
    await user.click(screen.getByRole('link', { name: 'Cart, 1 item' }));
    await user.click(screen.getByRole('button', { name: 'Decrease Aloe Vera quantity' }));
    expect(screen.getByRole('heading', { name: 'Your cart is ready to grow.' })).toBeInTheDocument();
    expect(screen.getByText('Total: $0.00')).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    await user.click(screen.getByRole('button', { name: 'Continue Shopping' }));
    await user.click(screen.getByRole('button', { name: 'Add Aloe Vera to cart' }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  it('preserves the cart when navigating Home, Plants, and Cart', async () => {
    const { user } = setup('plants');
    await user.click(screen.getByRole('button', { name: 'Add Monstera to cart' }));
    await user.click(screen.getByRole('link', { name: 'Home', exact: true }));
    await user.click(screen.getByRole('link', { name: 'Plants', exact: true }));
    expect(screen.getByRole('button', { name: 'Monstera added to cart' })).toBeDisabled();
    await user.click(screen.getByRole('link', { name: 'Cart, 1 item' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$35.00');
    expect(screen.getByRole('link', { name: 'Home', exact: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Plants', exact: true })).toBeInTheDocument();
  });

  it('totals one of every plant correctly', async () => {
    const { user } = setup('plants');
    for (const plant of products) await user.click(screen.getByRole('button', { name: `Add ${plant.name} to cart` }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('18');
    await user.click(screen.getByRole('link', { name: 'Cart, 18 items' }));
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$485.00');
  });
});

describe('Cart data integrity', () => {
  it('ignores invalid quantities and uses cents for currency arithmetic', () => {
    const store = createAppStore();
    store.dispatch(addItem({ ...products[0], price: 0.1 }));
    store.dispatch(addItem({ ...products[1], price: 0.2 }));
    expect(selectTotalCost(store.getState())).toBe(0.3);
    for (const quantity of [-1, 1.5, NaN, Infinity]) {
      store.dispatch(updateQuantity({ id: products[0].id, quantity }));
      expect(store.getState().cart.items[0].quantity).toBe(1);
    }
  });
});
