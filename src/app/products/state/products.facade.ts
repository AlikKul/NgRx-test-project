import { Injectable } from '@angular/core';
import { ProductsState } from './products.reducer';
import { Store, select } from '@ngrx/store';
import * as productsActions from './products.actions';
import { Observable } from 'rxjs';
import { Product, ProductSortEvent } from 'src/app/shared/interfaces';
import { getProducts, getError, getIsLoading } from './products.selectors';

@Injectable({providedIn: 'root'})
export class ProductsFacade {

  products$: Observable<Product[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<ProductsState>
  ) {
    this.products$ = this.store.pipe(select(getProducts));
    this.error$ = this.store.pipe(select(getError));
    this.isLoading$ = this.store.pipe(select(getIsLoading));
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

  clearProducts() {
    this.store.dispatch(new productsActions.ClearProducts());
  }

  sortProducts(productSortEvent: ProductSortEvent) {
    this.store.dispatch(new productsActions.SortProducts(productSortEvent));
  }

}
