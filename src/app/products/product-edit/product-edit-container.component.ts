import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { getEditProduct } from '../state/products.selectors';
import { ClearEditProduct } from '../state/products.actions';
import { Router } from '@angular/router';
import { ProductsService } from '../produts.service';

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

  constructor(
    private store: Store,
    private router: Router,
    private productService: ProductsService
  ) {
    this.editProduct$ = this.store.pipe(select(getEditProduct));
  }

  ngOnInit() {
  }

  addNewProduct(product) {
    this.productService.addNewProduct(product);
    this.store.dispatch(new ClearEditProduct());
    this.router.navigate(['product-list']);
  }

  updateProduct(product) {
    this.productService.updateProduct(product);
    this.store.dispatch(new ClearEditProduct());
    this.router.navigate(['product-list']);
  }

  cancelChanges() {
    this.store.dispatch(new ClearEditProduct());
    this.router.navigate(['product-list']);
  }

}
