import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCart,
  (state: CartState) => state.items
);

export const selectCartCount = createSelector(
  selectCartItems,
  items => items.length
);

export const selectCartTotal = createSelector(
  selectCartItems,
  items => items.reduce((total, item) => total + item.price, 0)
);
