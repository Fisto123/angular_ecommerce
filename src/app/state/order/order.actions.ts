import { createAction, props } from '@ngrx/store';
import { orderModel, orderModelDB } from 'src/app/model/order';
const POST_USER_DETAILS = '[ORDER PAGE]POST USER DETAILS ';
const DELETE_ORDER = '[ORDER PAGE]DELETE ORDER ';
const EDIT_ORDER_INFO = '[ORDER PAGE]EDIT ORDER INFO ';
const POST_ORDER = '[ORDER PAGE] POST ORDER INIT ';
const POST_ORDER_SUCCESS = '[ORDER PAGE] POST ORDER SUCCESS ';
const POST_ORDER_FAILURE = '[ORDER PAGE] POST ORDER FAILURE ';
export const PostUserDetails = createAction(
  POST_USER_DETAILS,
  props<{ orders: orderModel }>()
);

export const DeleteOrder = createAction(DELETE_ORDER);

export const EditOrderInfo = createAction(
  EDIT_ORDER_INFO,
  props<{ values: orderModel }>()
);

export const postOrder = createAction(
  POST_ORDER,
  props<{ orders: orderModelDB }>()
);

export const postOrderSuccess = createAction(
  POST_ORDER_SUCCESS,
  props<{ orders: orderModelDB }>()
);

export const postOrderFailure = createAction(
  POST_ORDER_FAILURE,
  props<{ error: string }>()
);
