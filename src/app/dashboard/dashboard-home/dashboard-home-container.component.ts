import { Component, OnInit } from '@angular/core';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { ProductsFacade } from 'src/app/products/state/products.facade';
import { Observable } from 'rxjs';
import { User, Purchase } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-home-container',
  template: `
    <app-header></app-header>

    <app-dashboard-home></app-dashboard-home>
  `
})
export class DashboardHomeContainerComponent implements OnInit {

  users$: Observable<User[]>;
  usersPurchases$: Observable<Purchase[]>;

  constructor(
    private usersFacade: UsersFacade,
    private productsFacade: ProductsFacade
  ) {}

  ngOnInit() {}

}
