import { combineReducers } from 'redux';
import { cartReducer } from './state/cart/cart.reducer';
import { CART_STATE_NAME } from './state/cart/cart.selector';
import { cartState } from './state/cart/cart.state';
import { productReducer } from './state/product/product.reducer';
import { PRODUCT_STATE_NAME } from './state/product/product.selector';
import { ProductState } from './state/product/product.state';
import { ORDER_STATE_NAME } from './state/order/order.selector';
import { orderState } from './state/order/order.state';
import { orderReducer } from './state/order/order.reducers';

export interface AppState {
  [PRODUCT_STATE_NAME]: ProductState;
  [CART_STATE_NAME]: cartState;
  [ORDER_STATE_NAME]: orderState;
}

export const appReducer = {
  [PRODUCT_STATE_NAME]: productReducer,
  [CART_STATE_NAME]: cartReducer,
  [ORDER_STATE_NAME]: orderReducer,
};
