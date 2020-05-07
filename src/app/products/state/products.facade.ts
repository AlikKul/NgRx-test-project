import { Injectable } from '@angular/core';
import { ProductsState } from './products.reducer';
import { Store, select } from '@ngrx/store';
import * as productsActions from './products.actions';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { getProducts, getError } from './products.selectors';

@Injectable({providedIn: 'root'})
export class ProductsFacade {

  products$: Observable<Product[]>;
  error$: Observable<string>;

  constructor(
    private store: Store<ProductsState>
  ) {
    this.products$ = this.store.pipe(select(getProducts));
    this.error$ = this.store.pipe(select(getError));
  }

  getProducts(name?) {
    this.store.dispatch(new productsActions.GetProducts(name));
  }

  setSelectedProduct(product) {
    this.store.dispatch(new productsActions.SetEditProduct(product));
  }

  addNewProduct(product) {
    this.store.dispatch(new productsActions.AddNewProduct(product));
  }

  saveEditedProduct(product) {
    this.store.dispatch(new productsActions.SaveEditedProduct(product));
  }

  deleteProduct(id) {
    this.store.dispatch(new productsActions.DeleteProduct(id));
  }

}
