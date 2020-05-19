import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { getEditProduct, getError } from '../state/products.selectors';
import { ProductsFacade } from '../state/products.facade';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-edit-container',
  template: `
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
    private productsFacade: ProductsFacade,
    private modalService: NgbModal
  ) {
    this.editProduct$ = this.store.pipe(select(getEditProduct));
    this.error$ = this.store.pipe(select(getError));
  }

  ngOnInit() {
  }

  addNewProduct(product) {
    this.productsFacade.addNewProduct(product);
    this.modalService.dismissAll();
  }

  updateProduct(product) {
    this.productsFacade.saveEditedProduct(product);
    this.modalService.dismissAll();
  }

  cancelChanges() {
    this.modalService.dismissAll();
  }

}
