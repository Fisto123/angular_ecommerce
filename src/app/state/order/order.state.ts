import { orderModel } from 'src/app/model/order';

export interface orderState {
  orders: orderModel[];
  isLoading: boolean;
  isError: string;
}

export const INITIAL_STATE: orderState = {
  orders: [],
  isLoading: false,
  isError: '',
};
