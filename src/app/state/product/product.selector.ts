import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const PRODUCT_STATE_NAME = 'products';

const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);
export const getProduct = createSelector(getProductState, (state) => {
  return state.products;
});

export const getLoading = createSelector(getProductState, (state) => {
  return state.isLoading;
});

export const getErrorMessage = createSelector(getProductState, (state) => {
  return state.isError;
});
export const getFilteredProd = createSelector(getProductState, (state) => {
  return state.filteredProd;
});
