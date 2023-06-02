import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartState } from './cart.state';

export const CART_STATE_NAME = 'cart';
export const getCartState = createFeatureSelector<cartState>(CART_STATE_NAME);
export const getCarts = createSelector(getCartState, (state) => {
  return state.carts;
});
export const getTotalAmount = createSelector(getCartState, (state) => {
  return state.cartTotalAmount;
});
export const getMessage = createSelector(getCartState, (state) => {
  return state.message;
});
