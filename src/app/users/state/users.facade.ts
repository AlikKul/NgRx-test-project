import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import {
  getError,
  getAccessType,
  getLoggedInUserName,
  getSelectedUser} from './users.selectors';
import { Observable } from 'rxjs';
import { User, AccessType } from '../../shared/interfaces';
import * as userActions from './users.actions';
import { UsersService } from '../users.service';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  error$: Observable<string>;
  selectedUser$: Observable<User>;
  accessType$: Observable<AccessType>;
  loggedInUserName$: Observable<string>;

  constructor(
    private store: Store<UsersState>,
    private usersService: UsersService
  ) {
    this.error$ = this.store.pipe(select(getError));
    this.selectedUser$ = this.store.pipe(select(getSelectedUser));
    this.accessType$ = this.store.pipe(select(getAccessType));
    this.loggedInUserName$ = store.pipe(select(getLoggedInUserName));
  }

  load(sortColumn, direction) {
    return this.usersService.getAllUsers(sortColumn, direction);
  }

  setSelectedUser(user) {
    this.store.dispatch(new userActions.SetSelectedUser(user));
  }

  deleteUser(id) {
    this.store.dispatch(new userActions.DeleteUser(id));
  }

  clearSelectedUser() {
    this.store.dispatch(new userActions.ClearSelectedUser());
  }

  updateUser(updatedUser) {
    this.store.dispatch(new userActions.SaveUser(updatedUser));
  }

  addNewUser(user) {
    return this.usersService.addNewUser(user);
  }

  setAccessType(value) {
    this.store.dispatch(new userActions.SetAccessType(value));
  }

  setLoggedInUserName(name) {
    this.store.dispatch(new userActions.SetLoggedInUserName(name));
  }

}
