import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderState } from './order.state';

export const ORDER_STATE_NAME = 'order';

export const getOrderState =
  createFeatureSelector<orderState>(ORDER_STATE_NAME);
export const getOrders = createSelector(getOrderState, (state) => {
  return state.orders;
});
export const getError = createSelector(getOrderState, (state) => {
  return state.isError;
});
