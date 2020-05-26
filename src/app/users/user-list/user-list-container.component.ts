import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User, AccessType, UserSortEvent } from '../../shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';
import { GlobalFacade } from 'src/app/shared/state/global.facade';

@Component({
  selector: 'app-user-list-container',
  template: `
    <app-header></app-header>

    <app-user-list
      [users]="users$ | async"
      [error]="error$ | async"
      [alert]="alert$ | async"
      [accessType]="accessType$ | async"
      [isLoading]="isLoading$ | async"
      (initializeNewUser)="addUser()"
      (deleteUserId)="deleteUser($event)"
      (edit)="onEdit($event)"
      (showPurchases)="onShowPurchases($event)"
      (sort)="onSort($event)"
    ></app-user-list>
  `
})

export class UserListContainerComponent implements OnInit {

  users$: Observable<User[]>;
  error$: Observable<string>;
  alert$: Observable<string>;
  loggedInUser$: Observable<any>;
  accessType$: Observable<AccessType>;
  isLoading$: Observable<boolean>;

  constructor(
    private usersFacade: UsersFacade,
    private globalFacade: GlobalFacade,
    private router: Router
  ) {
    this.users$ = this.usersFacade.users$;
    this.error$ = this.usersFacade.error$;
    this.alert$ = this.globalFacade.alert$;
    this.accessType$ = this.globalFacade.accessType$;
    this.isLoading$ = this.usersFacade.isLoading$;
  }

  ngOnInit() {
    this.usersFacade.getUsers({column: 'name', direction: 'asc'});
    this.usersFacade.clearUsersPurchases();
  }

  deleteUser(id) {
    this.usersFacade.deleteUser(id);
  }

  onEdit(user) {
    this.usersFacade.setSelectedUser(user);
  }

  onShowPurchases(user) {
    this.usersFacade.setSelectedUser(user);
    this.router.navigate(['user-purchases']);
  }

  addUser() {
    this.usersFacade.setSelectedUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      accessType: AccessType.Visitor
    });
  }

  onSort({column, direction}: UserSortEvent) {
    this.usersFacade.getUsers({column, direction});
  }

}
