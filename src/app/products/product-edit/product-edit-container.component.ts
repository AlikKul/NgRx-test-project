import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { getEditProduct, getError } from '../state/products.selectors';
import { Router } from '@angular/router';
import { ProductsFacade } from '../state/products.facade';

@Component({
  selector: 'app-product-edit-container',
  template: `
    <app-header></app-header>

    <app-product-edit
      [editProduct]="editProduct$ | async"
      (addNewProduct)="addNewProduct($event)"
      (updateProduct)="updateProduct($event)"
      (cancelChanges)="cancelChanges()"
    ></app-product-edit>
  `
})
export class ProductEditContainerComponent implements OnInit {

  editProduct$: Observable<Product>;
  error$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private productsFacade: ProductsFacade
  ) {
    this.editProduct$ = this.store.pipe(select(getEditProduct));
    this.error$ = this.store.pipe(select(getError));
  }

  ngOnInit() {
  }

  addNewProduct(product) {
    this.productsFacade.addNewProduct(product);
  }

  updateProduct(product) {
    this.productsFacade.saveEditedProduct(product);
  }

  cancelChanges() {
    this.router.navigate(['product-list']);
  }

}
