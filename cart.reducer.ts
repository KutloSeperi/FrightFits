import { createReducer, on, Action } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { Product } from '../../models/product';

export interface CartState {
  items: Product[];
}

export const initialState: CartState = {
  items: []
};

const _cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(CartActions.removeFromCart, (state, { item }) => {
    const index = state.items.findIndex(
      cartItem => cartItem.id === item.id && cartItem.name === item.name
    );
    if (index === -1) return state;
    const updatedItems = [...state.items];
    updatedItems.splice(index, 1);
    return { ...state, items: updatedItems };
  })
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
