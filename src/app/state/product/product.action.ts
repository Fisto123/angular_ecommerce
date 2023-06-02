import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/model/product';
const PRODUCT_FETCH = ' [Product Page] INITIALIZE FETCH PRODUCT';
const PRODUCT_FETCH_SUCCESS = ' [Product Page]  FETCH PRODUCT SUCCESS';
const PRODUCT_FETCH_ERROR = ' [Product Page]  FETCH PRODUCT ERROR';
const FETCH_BY_CAT_INIT = '[Category Page] FETCH PRODUCT BY CATEGORY INITIALLY';
const FETCH_BY_CAT = '[Category Page] FETCH PRODUCT BY CATEGORY';
const FILTER_PRODUCT = '[Category Page] FILTER PRODUCT';

export const FetchProduct = createAction(PRODUCT_FETCH);

export const FetchProductSuccess = createAction(
  PRODUCT_FETCH_SUCCESS,
  props<{ product: ProductModel }>()
);
export const FetchProductError = createAction(
  PRODUCT_FETCH_ERROR,
  props<{ error: string }>()
);
export const FetchProductCatInit = createAction(FETCH_BY_CAT_INIT);

export const FetchProductByCat = createAction(
  FETCH_BY_CAT,
  props<{ product: ProductModel }>()
);
export const FilterProduct = createAction(FILTER_PRODUCT);
