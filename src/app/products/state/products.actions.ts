import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces';

export enum ProductsActionsTypes {
  SetEditProduct = '[Products] Set Edit Product',
  ClearEditProduct = '[Products] Clear Edit Product'
}

export class SetEditProduct implements Action {
  readonly type = ProductsActionsTypes.SetEditProduct;
  constructor(public payload: Product) {}
}

export class ClearEditProduct implements Action {
  readonly type = ProductsActionsTypes.ClearEditProduct;
}

export type ProductsActions = SetEditProduct
  | ClearEditProduct;
