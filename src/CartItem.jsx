import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartItems, selectTotalQuantity, selectTotalCost } from './CartSlice.jsx';
import NavBar from './NavBar.jsx';
import { formatPrice } from './format.js';
import { ArrowIcon, CartIcon, TrashIcon } from './Icons.jsx';

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalCost = useSelector(selectTotalCost);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const changeQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
    setCheckoutMessage('');
  };

  return <>
    <NavBar currentPage="cart" onNavigate={onNavigate} />
    <main id="main-content" className="cart-page container" tabIndex="-1">
      <p className="eyebrow">A LITTLE GREEN, ON ITS WAY</p>
      <div className="cart-heading"><h1>Your shopping cart.</h1><p data-testid="cart-item-total">{totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'} in your cart</p></div>
      {items.length === 0 ? <section className="empty-cart"><span className="empty-icon"><CartIcon /></span><h2>Your cart is ready to grow.</h2><p>Choose a plant from our collection to get started.</p><p className="empty-total">Total: {formatPrice(totalCost)}</p><button className="button button-green" onClick={() => onNavigate('plants')}>Continue Shopping <ArrowIcon /></button></section> :
        <div className="cart-layout">
          <section className="cart-items" aria-label="Plants in your cart">
            <div className="cart-column-headings" aria-hidden="true"><span>PLANT</span><span>QUANTITY</span><span>TOTAL</span></div>
            {items.map((item) => <article className="cart-row" key={item.id} aria-label={`${item.name} in cart`}>
              <div className="cart-plant"><img src={item.image} alt={item.name} width="120" height="120" /><div><h2>{item.name}</h2><p>{formatPrice(item.price)} each</p><button className="remove-button" aria-label={`Delete ${item.name}`} onClick={() => { dispatch(removeItem(item.id)); setCheckoutMessage(''); }}><TrashIcon />Delete</button></div></div>
              <div className="quantity-control" aria-label={`${item.name} quantity`}><button aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item.id, item.quantity - 1)}>−</button><span aria-live="polite" data-testid={`quantity-${item.id}`}>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button></div>
              <strong className="line-total" data-testid={`subtotal-${item.id}`}>{formatPrice(Math.round(item.price * 100) * item.quantity / 100)}</strong>
            </article>)}
            <button className="text-button continue-button" onClick={() => onNavigate('plants')}><ArrowIcon />Continue Shopping</button>
          </section>
          <aside className="order-summary" aria-labelledby="summary-heading"><p className="eyebrow">YOUR COLLECTION</p><h2 id="summary-heading">Order summary</h2><div className="summary-line"><span>Total plants</span><span data-testid="summary-quantity">{totalQuantity}</span></div><div className="summary-line"><span>Plant subtotal</span><span>{formatPrice(totalCost)}</span></div><div className="summary-total"><span>Total</span><strong data-testid="cart-total" aria-live="polite">{formatPrice(totalCost)}</strong></div><button className="button button-green checkout-button" onClick={() => setCheckoutMessage('Coming Soon! Online checkout is not available yet.')}>Checkout <ArrowIcon /></button><p className="checkout-note">Checkout is coming soon.</p>{checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}</aside>
        </div>}
    </main>
  </>;
}
