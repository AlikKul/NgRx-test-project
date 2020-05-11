import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces';

export enum ProductsActionsTypes {
  GetProducts = '[Products] Get Products',
  GetProductsSuccess = '[Products] Get Products Success',
  GetProductsFail = '[Products] Get Products Fail',
  AddNewProduct = '[Products] Add New Product',
  AddNewProductSuccess = '[Products] Add New Product Success',
  AddNewProductFail = '[Products] Add New Product Fail',
  SaveEditedProduct = '[Products] Save Edited Product',
  SaveEditedProductSuccess = '[Products] Save Edited Product Success',
  SaveEditedProductFail = '[Products] Save Edited Product Fail',
  DeleteProduct = '[Products] Delete Product',
  DeleteProductSuccess = '[Products] Delete Product Success',
  DeleteProductFail = '[Products] Delete Product Fail',
  SetEditProduct = '[Products] Set Edit Product',
  ClearEditProduct = '[Products] Clear Edit Product',
  ClearProducts = '[Products] Clear Products'
}

export class GetProducts implements Action {
  readonly type = ProductsActionsTypes.GetProducts;
  constructor(public payload: string) {}
}

export class GetProductsSuccess implements Action {
  readonly type = ProductsActionsTypes.GetProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class GetProductsFail implements Action {
  readonly type = ProductsActionsTypes.GetProductsFail;
  constructor(public payload: string) {}
}

export class AddNewProduct implements Action {
  readonly type = ProductsActionsTypes.AddNewProduct;
  constructor(public payload: Product) {}
}

export class AddNewProductSuccess implements Action {
  readonly type = ProductsActionsTypes.AddNewProductSuccess;
}

export class AddNewProductFail implements Action {
  readonly type = ProductsActionsTypes.AddNewProductFail;
  constructor(public payload: string) {}
}

export class SaveEditedProduct implements Action {
  readonly type = ProductsActionsTypes.SaveEditedProduct;
  constructor(public payload: Product) {}
}

export class SaveEditedProductSuccess implements Action {
  readonly type = ProductsActionsTypes.SaveEditedProductSuccess;
}

export class SaveEditedProductFail implements Action {
  readonly type = ProductsActionsTypes.SaveEditedProductFail;
  constructor(public payload: string) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductsActionsTypes.DeleteProduct;
  constructor(public payload: string) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductsActionsTypes.DeleteProductSuccess;
}

export class DeleteProductFail implements Action {
  readonly type = ProductsActionsTypes.DeleteProductFail;
  constructor(public payload: string) {}
}

export class SetEditProduct implements Action {
  readonly type = ProductsActionsTypes.SetEditProduct;
  constructor(public payload: Product) {}
}

export class ClearEditProduct implements Action {
  readonly type = ProductsActionsTypes.ClearEditProduct;
}

export class ClearProducts implements Action {
  readonly type = ProductsActionsTypes.ClearProducts;
}

export type ProductsActions =
    GetProducts
  | GetProductsSuccess
  | GetProductsFail
  | AddNewProduct
  | AddNewProductSuccess
  | AddNewProductFail
  | SaveEditedProduct
  | SaveEditedProductSuccess
  | SaveEditedProductFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail
  | SetEditProduct
  | ClearEditProduct
  | ClearProducts;
