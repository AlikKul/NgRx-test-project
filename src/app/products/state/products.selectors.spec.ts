import { Product } from 'src/app/shared/interfaces';
import { getProducts, getEditProduct } from './products.selectors';
import { initialState } from './products.reducer';

describe('Products selectors', () => {
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
  const products = [ mockProduct1, mockProduct2 ];

  it('should retrieve products', () => {
    const state = {
      ...initialState,
      products
    };
    expect(getProducts.projector(state)).toBe(products);
  });

  it('should retrieve selected product', () => {
    const state = {
      ...initialState,
      editProduct: mockProduct1
    };
    expect(getEditProduct.projector(state)).toBe(mockProduct1);
  });


});
