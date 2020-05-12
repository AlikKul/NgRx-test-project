import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { ProductsFacade } from '../state/products.facade';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-list-container',
  template: `
    <app-header></app-header>

    <app-product-list
      [products]="products$ | async"
      [error]="error$ | async"
      (editProduct)=editProduct($event)
      (deleteProductId)="deleteProduct($event)"
      (initializeNewProduct)="addNewProduct()"
      (productNameQuery)="productNameQuery($event)"
    ></app-product-list>
  `
})
export class ProductListContainerComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>;
  productNameQuery$: Subject<string> = new Subject<string>();
  querySub: Subscription;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private productsFacade: ProductsFacade
  ) {
    this.products$ = this.productsFacade.products$;
    this.error$ = this.productsFacade.error$;
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
    this.router.navigate(['product-edit']);
  }

  deleteProduct(id) {
    this.productsFacade.deleteProduct(id);
  }

  editProduct(product) {
    this.productsFacade.setSelectedProduct(product);
    this.router.navigate(['product-edit']);
  }

  productNameQuery(name: string) {
    this.productNameQuery$.next(name);
  }

}
