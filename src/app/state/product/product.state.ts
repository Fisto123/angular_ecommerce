import { ProductModel } from 'src/app/model/product';

export interface ProductState {
  products: ProductModel[];
  filteredProd: ProductModel[];
  isLoading: boolean;
  isError: string;
}
export const INITIAL_STATE: ProductState = {
  products: [],
  filteredProd: [],
  isLoading: false,
  isError: '',
};
