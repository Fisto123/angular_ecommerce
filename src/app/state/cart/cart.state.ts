import { ProductModel } from 'src/app/model/product';

export interface cartState {
  carts: ProductModel[];
  message: string;
  cartTotalQuantity: number;
  cartTotalAmount: number;
  isLoading: boolean;
  isError: string;
}

export const INITIAL_STATE: cartState = {
  carts: [],
  isLoading: false,
  isError: '',
  message: '',
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
