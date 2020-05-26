import { reducer, initialState } from './products.reducer';
import {
  GetProducts,
  GetProductsSuccess,
  GetProductsFail,
  AddNewProduct,
  AddNewProductSuccess,
  AddNewProductFail,
  SaveEditedProduct,
  SaveEditedProductSuccess,
  SaveEditedProductFail} from './products.actions';
import { Product } from 'src/app/shared/interfaces';

describe('Products reducer', () => {

  const mockProduct: Product = {
    id: '123',
    name: 'Apple',
    description: '...',
    price: 100,
    salesCount: 10
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'INVALID_ACTION' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[Products] Get Products', () => {
    it('should toggle loading flag', () => {
      const action = new GetProducts('');
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Products] Get Products Success', () => {
    it('should load products to state and toggle loading flag', () => {
      const products: Product[] = [ mockProduct ];
      const action = new GetProductsSuccess(products);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        products: [
          {
            id: '123',
            name: 'Apple',
            description: '...',
            price: 100,
            salesCount: 10
          }
        ],
        isLoading: false
      });
    });
  });

  describe('[Products] Get Products Fail', () => {
    it('should load error message to state and toggle loading flag', () => {
      const action = new GetProductsFail('what went wrong');
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: 'what went wrong',
        isLoading: false
      });
    });
  });

  describe('[Products] Add New Product', () => {
    it('should toggle loading flag', () => {
      const action = new AddNewProduct(mockProduct);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Products] Add New Product Success', () => {
    it('should toggle loading flag', () => {
      const action = new AddNewProductSuccess();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: '',
        isLoading: false
      });
    });
  });

  describe('[Products] Add New Product Fail', () => {
    it('should load error message to state and toggle loading flag', () => {
      const action = new AddNewProductFail('what went wrong');
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: 'what went wrong',
        isLoading: false
      });
    });
  });

  describe('[Products] Save Edited Product', () => {
    it('should toggle loading flag', () => {
      const action = new SaveEditedProduct(mockProduct);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Products] Save Edited Product Success', () => {
    it('should toggle loading flag', () => {
      const action = new SaveEditedProductSuccess();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: '',
        isLoading: false
      });
    });
  });

  describe('[Products] Save Edited Product Fail', () => {
    it('should load error message to state and toggle loading flag', () => {
      const action = new SaveEditedProductFail('what went wrong');
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: 'what went wrong',
        isLoading: false
      });
    });
  });

});
