import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersFacade } from '../state/users.facade';
import { Product, PurchaseDetailsQuery, User } from 'src/app/shared/interfaces';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsFacade } from 'src/app/products/state/products.facade';

@Component({
  selector: 'app-user-purchases-container',
  template: `
    <app-header></app-header>

    <app-user-purchases
      [purchases]="purchases$ | async"
      [selectedUser]="selectedUser$ | async"
      [purchasedProducts]="purchasedProducts$ | async"
      (navBack)="onNavBack()"
      (showPurchaseDetails)="onShowPurchaseDetails($event)"
    ></app-user-purchases>
  `
})
export class UserPurchasesContainerComponent implements OnInit {

  selectedUser$: Observable<User>;
  purchases$: Observable<any>;
  purchasedProducts$: Observable<Product[]>;
  purchaseDetailsQuery$: Subject<PurchaseDetailsQuery> = new Subject<PurchaseDetailsQuery>();

  constructor(
    private usersService: UsersService,
    private productsFacade: ProductsFacade,
    private usersFacade: UsersFacade,
    private router: Router
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$
      .pipe(
        tap((user: User) => this.usersFacade.getUsersPurchases(user.id))
      );
    this.purchases$ = usersFacade.usersPurchases$;
    this.purchasedProducts$ = this.purchaseDetailsQuery$.pipe(
      switchMap((purchaseDetailsQuery) => combineLatest(
        this.productsFacade.products$,
        this.usersService.getPurchaseDetails(purchaseDetailsQuery)),
      ),
      map(([products, itemIds]) =>
        itemIds.map(id => products.find(product => product.id === id.itemId),
        ),
      ),
    );
  }

  ngOnInit() {
    this.productsFacade.getAllProducts();
  }

  onShowPurchaseDetails(purchaseDetailsQuery: PurchaseDetailsQuery) {
    this.purchaseDetailsQuery$.next(purchaseDetailsQuery);
  }

  onNavBack() {
    this.router.navigate(['user-list']);
  }

}
