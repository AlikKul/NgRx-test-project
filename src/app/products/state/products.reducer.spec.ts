import { reducer, initialState } from './products.reducer';
import { GetProducts, GetProductsSuccess, GetProductsFail } from './products.actions';
import { Product } from 'src/app/shared/interfaces';

describe('Products reducer', () => {

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
      const products: Product[] = [
        {
          id: '123',
          name: 'Apple',
          description: '...',
          price: 100,
          salesCount: 10
        }
      ];
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

});
