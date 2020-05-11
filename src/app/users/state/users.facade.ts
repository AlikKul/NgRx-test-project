import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import {
  getError,
  getAccessType,
  getLoggedInUserName,
  getSelectedUser,
  getUsersPurchases} from './users.selectors';
import { Observable } from 'rxjs';
import { User, AccessType, Purchase } from '../../shared/interfaces';
import * as usersActions from './users.actions';
import { UsersService } from '../users.service';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  error$: Observable<string>;
  selectedUser$: Observable<User>;
  usersPurchases$: Observable<Purchase[]>;
  accessType$: Observable<AccessType>;
  loggedInUserName$: Observable<string>;

  constructor(
    private store: Store<UsersState>,
    private usersService: UsersService
  ) {
    this.error$ = this.store.pipe(select(getError));
    this.selectedUser$ = this.store.pipe(select(getSelectedUser));
    this.usersPurchases$ = this.store.pipe(select(getUsersPurchases));
    this.accessType$ = this.store.pipe(select(getAccessType));
    this.loggedInUserName$ = store.pipe(select(getLoggedInUserName));
  }

  load(sortColumn, direction) {
    return this.usersService.getAllUsers(sortColumn, direction);
  }

  setSelectedUser(user) {
    this.store.dispatch(new usersActions.SetSelectedUser(user));
  }

  deleteUser(id) {
    this.store.dispatch(new usersActions.DeleteUser(id));
  }

  clearSelectedUser() {
    this.store.dispatch(new usersActions.ClearSelectedUser());
  }

  updateUser(updatedUser) {
    this.store.dispatch(new usersActions.SaveUser(updatedUser));
  }

  addNewUser(user) {
    return this.usersService.addNewUser(user);
  }

  getUsersPurchases(id) {
    this.store.dispatch(new usersActions.GetUsersPurchases(id));
  }

  clearUsersPurchases() {
    this.store.dispatch(new usersActions.ClearUsersPurchases());
  }

  addPurchase(purchaseWithUserId: {userId: string, purchase: Purchase}) {
    this.store.dispatch(new usersActions.AddPurchase(purchaseWithUserId));
  }

  setAccessType(value) {
    this.store.dispatch(new usersActions.SetAccessType(value));
  }

  setLoggedInUserName(name) {
    this.store.dispatch(new usersActions.SetLoggedInUserName(name));
  }

}
