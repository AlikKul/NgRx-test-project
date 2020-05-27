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
  SaveEditedProductFail,
  DeleteProduct,
  DeleteProductSuccess,
  DeleteProductFail,
  SetEditProduct,
  ClearEditProduct,
  ClearProducts,
  SortProducts} from './products.actions';
import { Product } from 'src/app/shared/interfaces';

describe('Products reducer', () => {

  const mockProduct1: Product = {
    id: '11',
    name: 'Apple',
    description: '...',
    price: 100,
    salesCount: 10
  };

  const mockProduct2: Product = {
    id: '22',
    name: 'LG',
    description: '...',
    price: 99,
    salesCount: 2
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
      const products: Product[] = [ mockProduct1, mockProduct2 ];
      const action = new GetProductsSuccess(products);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        products: [ mockProduct1, mockProduct2 ],
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
      const action = new AddNewProduct(mockProduct1);
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
      const action = new SaveEditedProduct(mockProduct1);
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

  describe('[Products] Delete Product', () => {
    it('should toggle loading flag', () => {
      const action = new DeleteProduct(mockProduct1.id);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Products] Delete Product Success', () => {
    it('should toggle loading flag', () => {
      const action = new DeleteProductSuccess();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: '',
        isLoading: false
      });
    });
  });

  describe('[Products] Delete Product Fail', () => {
    it('should load error message to state and toggle loading flag', () => {
      const action = new DeleteProductFail('what went wrong');
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error: 'what went wrong',
        isLoading: false
      });
    });
  });

  describe('[Products] Set Edit Product', () => {
    it('should load product to state', () => {
      const action = new SetEditProduct(mockProduct1);
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        editProduct: mockProduct1
      });
    });
  });

  describe('[Products] Clear Edit Product', () => {
    it('should remove product from state', () => {
      const mockState = {
        ...initialState,
        editProduct: mockProduct1
      };
      const action = new ClearEditProduct();
      const result = reducer(mockState, action);

      expect(result).toEqual({
        ...mockState,
        editProduct: null
      });
    });
  });

  describe('[Products] Clear Products', () => {
    it('should remove products from state', () => {
      const mockState = {
        ...initialState,
        products: [ mockProduct1, mockProduct2 ]
      };
      const action = new ClearProducts();
      const result = reducer(mockState, action);

      expect(result).toEqual({
        ...mockState,
        products: []
      });
    });
  });

  describe('[Products] Sort', () => {
    it('should reorder products stored in state', () => {
      const mockState = {
        ...initialState,
        products: [ mockProduct1, mockProduct2 ]
      };
      const action = new SortProducts({ column: 'name', direction: 'asc'} );
      const result = reducer(mockState, action);

      expect(result).toEqual(mockState);
    });
  });

});
