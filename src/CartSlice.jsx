import { createSlice } from '@reduxjs/toolkit';

// Redux keeps the product list, navigation badge, and cart in sync.
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      // Ignore invalid values so quantities cannot become negative or fractional.
      if (!Number.isSafeInteger(quantity) || quantity < 0) return;
      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const item = state.items.find((entry) => entry.id === id);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.items.reduce(
  (total, item) => total + item.quantity, 0,
);
// Sum integer cents, then convert to dollars for display.
export const selectTotalCost = (state) => state.cart.items.reduce(
  (total, item) => total + Math.round(item.price * 100) * item.quantity, 0,
) / 100;
export default cartSlice.reducer;
