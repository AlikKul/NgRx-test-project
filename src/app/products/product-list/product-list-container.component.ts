import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product, ProductSortEvent } from 'src/app/shared/interfaces';
import { ProductsFacade } from '../state/products.facade';
import { debounceTime } from 'rxjs/operators';
import { GlobalFacade } from 'src/app/shared/state/global.facade';

@Component({
  selector: 'app-product-list-container',
  template: `
    <app-header></app-header>

    <app-product-list
      [products]="products$ | async"
      [error]="error$ | async"
      [alert]="alert$ | async"
      [isLoading]="isLoading$ | async"
      (editProduct)=editProduct($event)
      (deleteProductId)="deleteProduct($event)"
      (initializeNewProduct)="addNewProduct()"
      (productNameQuery)="productNameQuery($event)"
      (productSortEvent)="productSortEvent($event)"
    ></app-product-list>
  `
})
export class ProductListContainerComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>;
  productNameQuery$: Subject<string> = new Subject<string>();
  querySub: Subscription;
  error$: Observable<string>;
  alert$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(
    private productsFacade: ProductsFacade,
    private globalFacade: GlobalFacade
  ) {
    this.products$ = this.productsFacade.products$;
    this.error$ = this.productsFacade.error$;
    this.alert$ = globalFacade.alert$;
    this.isLoading$ = productsFacade.isLoading$;
  }

  ngOnInit() {
    this.querySub = this.productNameQuery$.pipe(
      debounceTime(500)
    ).subscribe(name => this.productsFacade.getProducts(name));
    this.productsFacade.getProducts();
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

  addNewProduct() {
    this.productsFacade.setSelectedProduct({
      id: '',
      name: '',
      description: '',
      price: 0
    });
  }

  deleteProduct(id) {
    this.productsFacade.deleteProduct(id);
  }

  editProduct(product) {
    this.productsFacade.setSelectedProduct(product);
  }

  productNameQuery(name: string) {
    this.productNameQuery$.next(name);
  }

  productSortEvent({column, direction}: ProductSortEvent) {
    this.productsFacade.sortProducts({column, direction});
  }

}
