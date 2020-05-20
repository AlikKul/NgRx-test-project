import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersFacade } from '../state/users.facade';
import { Product, PurchaseDetailsQuery, User } from 'src/app/shared/interfaces';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsFacade } from 'src/app/products/state/products.facade';
import { GlobalFacade } from 'src/app/shared/state/global.facade';

@Component({
  selector: 'app-user-purchases-container',
  template: `
    <app-header></app-header>

    <app-user-purchases
      [alert]="alert$ | async"
      [purchases]="purchases$ | async"
      [selectedUser]="selectedUser$ | async"
      [purchasedProducts]="purchasedProducts$ | async"
      (navBack)="onNavBack()"
      (showPurchaseDetails)="onShowPurchaseDetails($event)"
      (addNewPurchase)="addNewPurchase()"
    ></app-user-purchases>
  `
})
export class UserPurchasesContainerComponent implements OnInit {

  alert$: Observable<string>;
  selectedUser$: Observable<User>;
  purchases$: Observable<any>;
  purchasedProducts$: Observable<Product[]>;
  purchaseDetailsQuery$: Subject<PurchaseDetailsQuery> = new Subject<PurchaseDetailsQuery>();

  constructor(
    private usersService: UsersService,
    private globalFacade: GlobalFacade,
    private productsFacade: ProductsFacade,
    private usersFacade: UsersFacade,
    private router: Router
  ) {
    this.alert$ = globalFacade.alert$;
    this.selectedUser$ = this.usersFacade.selectedUser$
      .pipe(
        tap((user: User) => this.usersFacade.getUsersPurchases(user.id))
      );
    this.purchases$ = usersFacade.usersPurchases$;
    this.purchasedProducts$ = this.purchaseDetailsQuery$.pipe(
      switchMap((purchaseDetailsQuery) => combineLatest(
        this.productsFacade.products$,
        this.usersService.getPurchasedProductsIds(purchaseDetailsQuery)),
      ),
      map(([products, itemIds]) =>
        itemIds.map(id => products.find(product => product.id === id),
        ),
      ),
    );
  }

  ngOnInit() {
    this.productsFacade.getProducts();
  }

  onShowPurchaseDetails(purchaseDetailsQuery: PurchaseDetailsQuery) {
    this.purchaseDetailsQuery$.next(purchaseDetailsQuery);
  }

  addNewPurchase() {
    this.router.navigate(['add-purchase']);
  }

  onNavBack() {
    this.router.navigate(['user-list']);
  }

}
