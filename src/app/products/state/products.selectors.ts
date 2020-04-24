import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

const getProductsFeatureSlice = createFeatureSelector<ProductsState>('products');

export const getEditProduct = createSelector(
  getProductsFeatureSlice,
  state => state.editProduct
);
