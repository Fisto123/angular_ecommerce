import { ProductModel } from './product';

export interface orderModel {
  orderId?: string;
  address: string;
  email: string;
  firstname: string;
  phone: number;
  username: string;
  lastname: string;
}

export interface orderModelDB {
  name: string;
  email: string;
  orderId: string;
  address: string;
  shippingFee: number;
  phone: number;
  cartItems: ProductModel[];
  cartTotalAmount: number;
}
