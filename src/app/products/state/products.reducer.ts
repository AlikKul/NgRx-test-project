import { Product } from 'src/app/shared/interfaces';
import { ProductsActionsTypes, ProductsActions } from './products.actions';

export interface ProductsState {
  editProduct: Product | null;
  error: string;
}

const initialState: ProductsState = {
  editProduct: null,
  error: ''
};

export function reducer(state: ProductsState = initialState, action: ProductsActions): ProductsState {
  switch (action.type) {

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
