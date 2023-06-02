export interface ProductModel {
  category: string;
  color: any[];
  createdAt: Date;
  desc: string;
  images: any;
  inStock: number;
  name: string;
  price: number;
  updatedAt: Date;
  __v: number;
  _id: string;
  cartQuantity: number;
}

export interface FormDatas {
  orderId?: string;
  address: string;
  email: string;
  firstname: string;
  phone: number;
  username: string;
  lastname: string;
}
