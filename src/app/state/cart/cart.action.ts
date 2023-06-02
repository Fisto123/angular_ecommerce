import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/model/product';

export const ADD_TO_CART = ' [CART] ADD TO CART';
export const DECREMENT_CART = ' [CART] DECREMENT CART';
export const INCREMENT_CART = ' [CART] INCREMENT CART';
export const CLEAR_CART = ' [CART] CLEAR CART';
export const DELETE_ITEM = ' [CART] DELETE_ITEM IN CART';
export const GET_TOTAL = ' [CART] GET_TOTAL';

export const addToCart = createAction(
  ADD_TO_CART,
  props<{ products: ProductModel; cartQuantity: number }>()
);

export const DecrementCart = createAction(
  DECREMENT_CART,
  props<{ id: string }>()
);

export const IncrementCart = createAction(
  INCREMENT_CART,
  props<{ id: string }>()
);

export const ClearCart = createAction(CLEAR_CART);

export const DeleteItem = createAction(DELETE_ITEM, props<{ id: string }>());

export const GetTotal = createAction(GET_TOTAL);
