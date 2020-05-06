import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { SetEditProduct } from '../state/products.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-container',
  template: `
    <app-header></app-header>

    <app-product-list
      [products]="products$ | async"
      (editProduct)=editProduct($event)
      (deleteProductId)="deleteProduct($event)"
      (initializeNewProduct)="addNewProduct()"
    ></app-product-list>
  `
})
export class ProductListContainerComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.products$ = this.productsService.getAllProducts();
  }

  addNewProduct() {
    this.store.dispatch(new SetEditProduct({
      id: '',
      name: '',
      description: '',
      price: 0
    }));
    this.router.navigate(['product-edit']);
  }

  deleteProduct(id) {
    this.productsService.deleteProduct(id);
  }

  editProduct(product) {
    this.store.dispatch(new SetEditProduct(product));
    this.router.navigate(['product-edit']);
  }

}
