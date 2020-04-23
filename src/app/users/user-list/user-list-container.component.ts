import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User, AccessType, SortEvent } from '../../shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-user-list-container',
  template: `
    <app-header></app-header>

    <app-user-list
      [users]="users$ | async"
      [error]="error$ | async"
      [accessType]="accessType$ | async"
      (initializeNewUser)="addUser()"
      (deleteUserId)="deleteUser($event)"
      (editUser)="editUser($event)"
      (sort)="onSort($event)"
    ></app-user-list>
  `
})

export class UserListContainerComponent implements OnInit {

  users$: Observable<User[]>;
  error$: Observable<string>;
  loggedinUser$: Observable<any>;
  accessType$: Observable<AccessType>;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
    private loginService: LoginService
  ) {
    this.users$ = this.usersFacade.load('name', 'asc');
    this.error$ = this.usersFacade.error$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  ngOnInit() {
    if (!this.loginService.isAuthenticated()) {
      localStorage.clear();
      this.router.navigate(['']);
    }
  }

  deleteUser(id) {
    this.usersFacade.deleteUser(id);
  }

  editUser(user) {
    this.usersFacade.setEditUser(user);
    this.router.navigate(['user-edit']);
  }

  addUser() {
    this.usersFacade.setEditUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      accessType: AccessType.Visitor
    });
    this.router.navigate(['user-edit']);
  }

  onSort({column, direction}: SortEvent) {
    this.users$ = this.usersFacade.load(column, direction);
  }

}
