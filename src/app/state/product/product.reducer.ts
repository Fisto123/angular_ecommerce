import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from './product.state';
import {
  FetchProduct,
  FetchProductByCat,
  FetchProductError,
  FetchProductSuccess,
  FilterProduct,
} from './product.action';
import { ProductModel } from 'src/app/model/product';

export const _productReducer = createReducer(
  INITIAL_STATE,
  on(FetchProduct, (state, action) => {
    return {
      ...state,
      isLoading: true,
      isError: '',
    };
  }),
  on(FetchProductSuccess, (state: any, { product }) => {
    return {
      ...state,
      products: product,
      isLoading: false,
      isError: '',
    };
  }),
  on(FetchProductError, (state: any, { error }) => {
    return {
      ...state,
      isLoading: false,
      isError: error,
    };
  }),
  on(FetchProductByCat, (state: any, { product }) => {
    return {
      ...state,
      products: product,
      isLoading: false,
      isError: '',
    };
  }),
  on(FilterProduct, (state: any, action) => {
    const filteredProd = state.products.filter(
      (item: ProductModel) => item.price < 300
    );

    return {
      ...state,
      products: filteredProd,
      isLoading: false,
      isError: '',
    };
  })
);

export const productReducer = (state: any, action: any) => {
  return _productReducer(state, action);
};
