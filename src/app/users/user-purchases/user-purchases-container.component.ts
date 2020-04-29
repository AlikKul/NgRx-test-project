import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersFacade } from '../state/users.facade';
import { User } from 'src/app/shared/interfaces';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-purchases-container',
  template: `
    <app-header></app-header>

    <app-user-purchases
      [purchases]="purchases$ | async"
    ></app-user-purchases>
  `
})
export class UserPurchasesContainerComponent implements OnInit {

  selectedUser$: Observable<User>;
  purchases$: Observable<any>;

  constructor(
    private usersService: UsersService,
    private usersFacade: UsersFacade
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$;
    this.purchases$ = this.selectedUser$.pipe(
      flatMap((user: User) => {
        return this.usersService.getAllPurchases(user.id);
      })
    );
  }

  ngOnInit() {}

}
