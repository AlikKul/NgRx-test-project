import { Component } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersFacade } from '../state/users.facade';
import { Product, PurchaseDetailsQuery, User } from 'src/app/shared/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/produts.service';

@Component({
  selector: 'app-user-purchases-container',
  template: `
    <app-header></app-header>

    <app-user-purchases
      [purchases]="purchases$ | async"
      [selectedUser]="selectedUser$ | async"
      [purchasedProducts]="purchasedProducts$ | async"
      (navBack)="onNavBack()"
      (showPurchaseDitails)="onShowPurchaseDitails($event)"
    ></app-user-purchases>
  `
})
export class UserPurchasesContainerComponent {

  selectedUser$: Observable<User>;
  purchases$: Observable<any>;
  purchasedProducts$: Observable<Product[]>;
  purchaseDetailsQuery$: Subject<PurchaseDetailsQuery> = new Subject<PurchaseDetailsQuery>()

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private usersFacade: UsersFacade,
    private router: Router
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$;
    this.purchases$ = this.selectedUser$.pipe(
      switchMap((user: User) => {
        return this.usersService.getAllPurchases(user.id);
      })
    );
    this.purchasedProducts$ = this.purchaseDetailsQuery$.pipe(
      switchMap((purchaseDetailsQuery) => combineLatest(
        this.productsService.getAllProducts(),
        this.usersService.getPurchaseDetails(purchaseDetailsQuery)),
      ),
      map(([products, itemIds]) =>
        itemIds.map(id => products.find(product => product.id === id.itemId),
        ),
      ),
    );
  }

  onShowPurchaseDitails(purchaseDetailsQuery: PurchaseDetailsQuery) {
    this.purchaseDetailsQuery$.next(purchaseDetailsQuery);
  }

  onNavBack() {
    this.router.navigate(['user-list']);
  }

}
