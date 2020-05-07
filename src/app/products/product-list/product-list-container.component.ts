import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { ProductsFacade } from '../state/products.facade';

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
export class ProductListContainerComponent implements OnInit {

  products$: Observable<Product[]>;
  error$: Observable<string>;

  constructor(
    private router: Router,
    private productsFacade: ProductsFacade
  ) {
    this.products$ = this.productsFacade.products$;
    this.error$ = this.productsFacade.error$;
  }

  ngOnInit() {
    this.productsFacade.getProducts();
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
    this.productsFacade.getProducts(name);
  }

}
