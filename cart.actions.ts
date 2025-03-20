import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ item: Product }>()
);
