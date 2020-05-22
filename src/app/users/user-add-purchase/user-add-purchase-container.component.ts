import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product, User } from 'src/app/shared/interfaces';
import { ProductsFacade } from 'src/app/products/state/products.facade';
import { debounceTime } from 'rxjs/operators';
import { UsersFacade } from '../state/users.facade';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-add-purchase-container',
  template: `
    <app-user-add-purchase
      [products]="products$ | async"
      [selectedUser]="selectedUser$ | async"
      [error]="error$ | async"
      (addPurchase)='addPurchase($event)'
      (productNameQuery)="productNameQuery($event)"
      (cancelChanges)="cancelChanges()"
    ></app-user-add-purchase>
  `
})
export class UserAddPurchaseContainerComponent implements OnInit, OnDestroy {

  products$: Observable<Product[]>;
  selectedUser$: Observable<User>;
  productNameQuery$: Subject<string> = new Subject<string>();
  querySub: Subscription;
  error$: Observable<string>;

  constructor(
    private productsFacade: ProductsFacade,
    private usersFacade: UsersFacade,
    private modalService: NgbModal
  ) {
    this.products$ = this.productsFacade.products$;
    this.selectedUser$ = this.usersFacade.selectedUser$;
    this.error$ = this.productsFacade.error$;
  }

  ngOnInit() {
    this.querySub = this.productNameQuery$.pipe(
      debounceTime(500)
    ).subscribe(name => this.productsFacade.getProducts(name));
    this.productsFacade.clearProducts();
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

  addPurchase(purchaseWithUserId) {
    this.usersFacade.addPurchase(purchaseWithUserId);
    this.modalService.dismissAll();
  }

  productNameQuery(name: string) {
    this.productNameQuery$.next(name);
  }

  cancelChanges() {
    this.modalService.dismissAll();
  }

}
