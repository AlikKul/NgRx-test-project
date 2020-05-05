import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, forkJoin, combineLatest, of, Subscription } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersFacade } from '../state/users.facade';
import { User, PurchaseDetailsQuery, Product } from 'src/app/shared/interfaces';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/produts.service';

@Component({
  selector: 'app-user-purchases-container',
  template: `
    <app-header></app-header>

    <app-user-purchases
      [purchases]="purchases$ | async"
      [selectedUser]="selectedUser$ | async"
      [purchasedProducts]="purchasedProducts"
      (navBack)="onNavBack()"
      (showPurchaseDitails)="onShowPurchaseDitails($event)"
    ></app-user-purchases>
  `
})
export class UserPurchasesContainerComponent implements OnInit, OnDestroy {

  selectedUser$: Observable<User>;
  purchases$: Observable<any>;
  purchasedProducts: Product[] = [];
  sub: Subscription;

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private usersFacade: UsersFacade,
    private router: Router
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$;
    this.purchases$ = this.selectedUser$.pipe(
      mergeMap((user: User) => {
        return this.usersService.getAllPurchases(user.id);
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onShowPurchaseDitails(purchaseDetailsQuery: PurchaseDetailsQuery) {
    this.sub = combineLatest(
      this.productsService.getAllProducts(),
      this.usersService.getPurchaseDetails(purchaseDetailsQuery)
    ).subscribe(([products, itemIds]) => {
      this.purchasedProducts = itemIds.map(id =>
        products.find(product =>
          product.id === id.itemId
        )
      );
    });
  }

  onNavBack() {
    this.router.navigate(['user-list']);
  }

}
