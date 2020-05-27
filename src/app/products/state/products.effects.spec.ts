import { Observable } from 'rxjs';
import { ProductsEffects } from './products.effects';
import { ProductsService } from '../products.service';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Product } from 'src/app/shared/interfaces';
import { GetProducts,
  GetProductsSuccess,
  GetProductsFail,
  AddNewProduct,
  AddNewProductSuccess,
  AddNewProductFail,
  SaveEditedProduct,
  SaveEditedProductSuccess,
  SaveEditedProductFail} from './products.actions';
import { cold, hot } from 'jest-marbles';
import { SetAlert } from 'src/app/shared/state/global.actions';

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
            getProducts: jest.fn(),
            addNewProduct: jest.fn()
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

  describe('addNewProduct', () => {
    it('should return AddNewProductSuccess action on success', () => {
      const action = new AddNewProduct(mockProduct1);
      const outcome = new AddNewProductSuccess();

      actions = hot('-a', { a: action});
      const response = cold('-a|', {});
      const expected = cold('--b', { b: outcome });
      productsService.addNewProduct = jest.fn(() => response);

      expect(effects.addNewProduct$).toBeObservable(expected);
    });

    it('should return AddNewProductFail action with an error message, on failure', () => {
      const action = new AddNewProduct(mockProduct1);
      const outcome = new AddNewProductFail('what went wrong');

      actions = hot('-a', { a: action});
      const response = cold('-#|', {}, 'what went wrong');
      const expected = cold('--b', { b: outcome });
      productsService.addNewProduct = jest.fn(() => response);

      expect(effects.addNewProduct$).toBeObservable(expected);
    });

  });

  describe('addNewProductSuccess', () => {
    it('should return SetAlert with success message', () => {
      const action = new AddNewProductSuccess();
      const outcome = new SetAlert('New product successfully added.');

      actions = hot('-a', { a: action});
      const expected = cold('-b', { b: outcome });

      expect(effects.addNewProductSuccess$).toBeObservable(expected);
    });
  });

  describe('saveEditedProduct', () => {
    it('should return SaveEditedProductSuccess action on success', () => {
      const action = new SaveEditedProduct(mockProduct1);
      const outcome = new SaveEditedProductSuccess();

      actions = hot('-a', { a: action} );
      const response = cold('-a|', {});
      const expected = cold('--b', { b: outcome });
      productsService.updateProduct = jest.fn(() => response);

      expect(effects.saveEditedProduct$).toBeObservable(expected);
    });

    it('should return SaveEditedProductFail action, with a error message, on failure', () => {
      const action = new SaveEditedProduct(mockProduct1);
      const outcome = new SaveEditedProductFail('what went wrong');

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, 'what went wrong');
      const expected = cold('--b', { b: outcome });
      productsService.updateProduct = jest.fn(() => response);

      expect(effects.saveEditedProduct$).toBeObservable(expected);
    });

  });

  describe('saveEditedProductSuccess', () => {
    it('should return SetAlert with success message', () => {
      const action = new SaveEditedProductSuccess();
      const outcome = new SetAlert('Product successfully updated.');

      actions = hot('-a', { a: action});
      const expected = cold('-b', { b: outcome });

      expect(effects.saveEditedProductSuccess$).toBeObservable(expected);
    });
  });

});
