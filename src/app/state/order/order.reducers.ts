import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './order.state';
import {
  DeleteOrder,
  EditOrderInfo,
  PostUserDetails,
  postOrder,
  postOrderFailure,
  postOrderSuccess,
} from './order.actions';

const _orderReducer = createReducer(
  INITIAL_STATE,
  on(PostUserDetails, (state: any, action) => {
    return {
      ...state,
      orders: action.orders,
    };
  }),
  on(DeleteOrder, (state: any, action) => {
    return {
      ...state,
      orders: [],
    };
  }),
  on(EditOrderInfo, (state: any, action) => {
    const updatedOrder = action.values;
    return {
      ...state,
      orders: updatedOrder,
    };
  }),
  on(postOrder, (state: any, action) => {
    return {
      ...state,
      isLoading: true,
      isError: 'errorFalse',
      message: 'load',
    };
  }),
  on(postOrderSuccess, (state: any, action) => {
    return {
      ...state,
      isLoading: false,
      isError: 'false',
      message: 'success',
    };
  }),
  on(postOrderFailure, (state: any, action) => {
    return {
      ...state,
      isLoading: false,
      isError: action.error,
      message: 'failure',
    };
  })
);

export const orderReducer = (state: any, action: any) => {
  return _orderReducer(state, action);
};
