import { Product } from 'src/app/shared/interfaces';
import { ProductsActionsTypes, ProductsActions } from './products.actions';

export interface ProductsState {
  products: Product[];
  editProduct: Product | null;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  editProduct: null,
  error: ''
};

export function reducer(state: ProductsState = initialState, action: ProductsActions): ProductsState {
  switch (action.type) {

    case ProductsActionsTypes.GetProducts:
      return state;

    case ProductsActionsTypes.GetProductsSuccess:
      return {
        ...state,
        products: action.payload
      };

    case ProductsActionsTypes.GetProductsFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductsActionsTypes.AddNewProductSuccess:
      return state;

    case ProductsActionsTypes.AddNewProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductsActionsTypes.SaveEditedProductSuccess:
      return state;

    case ProductsActionsTypes.AddNewProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductsActionsTypes.DeleteProductSuccess:
      return state;

    case ProductsActionsTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductsActionsTypes.SetEditProduct:
      return {
        ...state,
        editProduct: action.payload
      };

    case ProductsActionsTypes.ClearEditProduct:
      return {
        ...state,
        editProduct: null
      };

    default:
      return state;
  }
}
