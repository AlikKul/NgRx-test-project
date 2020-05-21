import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import {
  getUsers,
  getError,
  getSelectedUser,
  getUsersPurchases,
  getNumberOfUsersToDisplay} from './users.selectors';
import { Observable } from 'rxjs';
import { User, Purchase } from '../../shared/interfaces';
import * as usersActions from './users.actions';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  users$: Observable<User[]>;
  error$: Observable<string>;
  selectedUser$: Observable<User>;
  usersPurchases$: Observable<Purchase[]>;
  numberOfUsersToDisplay$: Observable<number>;

  constructor(
    private store: Store<UsersState>
  ) {
    this.users$ = this.store.pipe(select(getUsers));
    this.error$ = this.store.pipe(select(getError));
    this.selectedUser$ = this.store.pipe(select(getSelectedUser));
    this.usersPurchases$ = this.store.pipe(select(getUsersPurchases));
    this.numberOfUsersToDisplay$ = this.store.pipe(select(getNumberOfUsersToDisplay));
  }

  getUsers(sortEvent) {
    this.store.dispatch(new usersActions.GetUsers(sortEvent));
  }
  clearUsers() {
    this.store.dispatch(new usersActions.ClearUsers());
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
    this.store.dispatch(new usersActions.UpdateUser(updatedUser));
  }

  addNewUser(user) {
    return this.store.dispatch(new usersActions.AddNewUser(user));
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

  setNumberOfUsersToDisplay(num) {
    this.store.dispatch(new usersActions.SetNumberOfUsersToDisplay(num));
  }

}
