import { Observable } from 'rxjs';
import { ProductsEffects } from './products.effects';
import { ProductsService } from '../products.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Product } from 'src/app/shared/interfaces';
import { GetProducts,
  GetProductsSuccess,
  GetProductsFail } from './products.actions';
import { cold, hot } from 'jest-marbles';

describe('ProductsEffects', () => {
  let actions: Observable<any>;
  let effects: ProductsEffects;
  let productsService: ProductsService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions),
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(ProductsEffects);
    productsService = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getProducts', () => {

    it('should return GetProductsSuccess action with products on success', () => {
      const products = [ mockProduct1, mockProduct2 ];
      const action = new GetProducts('');
      const outcome = new GetProductsSuccess(products);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: products });
      const expected = cold('--b', { b: outcome});
      productsService.getProducts = jest.fn(() => response);

      expect(effects.getProducts$).toBeObservable(expected);
    });

    it('should return GetProductsFail action, with an error message, on failure', () => {
      const action = new GetProducts('');
      const outcome = new GetProductsFail('what went wrong');

      actions = hot('-a', { a: action});
      const response = cold('-#|', {}, 'what went wrong');
      const expected = cold('--b', { b: outcome });
      productsService.getProducts = jest.fn(() => response);

      expect(effects.getProducts$).toBeObservable(expected);
    });

  });


});
