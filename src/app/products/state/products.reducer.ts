import { Product } from 'src/app/shared/interfaces';
import { ProductsActionsTypes, ProductsActions } from './products.actions';

export interface ProductsState {
  products: Product[];
  editProduct: Product | null;
  error: string;
  isLoading: boolean;
}

export const initialState: ProductsState = {
  products: [],
  editProduct: null,
  error: '',
  isLoading: false
};

export function reducer(state: ProductsState = initialState, action: ProductsActions): ProductsState {
  switch (action.type) {

    case ProductsActionsTypes.GetProducts:
    case ProductsActionsTypes.AddNewProduct:
    case ProductsActionsTypes.SaveEditedProduct:
    case ProductsActionsTypes.DeleteProduct:
      return {
        ...state,
        isLoading: true
      };

    case ProductsActionsTypes.GetProductsSuccess:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      };

    case ProductsActionsTypes.GetProductsFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ProductsActionsTypes.AddNewProductSuccess:
      return {
        ...state,
        isLoading: false
      };

    case ProductsActionsTypes.AddNewProductFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ProductsActionsTypes.SaveEditedProductSuccess:
      return {
        ...state,
        isLoading: false
      };

    case ProductsActionsTypes.AddNewProductFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case ProductsActionsTypes.DeleteProductSuccess:
      return {
        ...state,
        isLoading: false
      };

    case ProductsActionsTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
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

    case ProductsActionsTypes.ClearProducts:
      return {
        ...state,
        products: []
      };

    case ProductsActionsTypes.SortProducts:
      const direction = action.payload.direction === 'asc' ? 1 : -1;
      const sortByKey = key => (a, b) => a[key] > b[key] ? 1 * direction : -1 * direction;
      return {
        ...state,
        products: [...state.products].sort(sortByKey(action.payload.column))
      };

    default:
      return state;
  }
}
