import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

const getProductsFeatureSlice = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
  getProductsFeatureSlice,
  state => state.products
);

export const getEditProduct = createSelector(
  getProductsFeatureSlice,
  state => state.editProduct
);

export const getError = createSelector(
  getProductsFeatureSlice,
  state => state.error
);

export const getIsLoading = createSelector(
  getProductsFeatureSlice,
  state => state.isLoading
);
