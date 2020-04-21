import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import {
  getError,
  getAccessType,
  getLoggedinUserName,
  getEditUser} from './users.selectors';
import { Observable } from 'rxjs';
import { User, AccessType } from '../../shared/interfaces';
import * as userActions from './users.actions';
import { UsersService } from '../users.service';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  error$: Observable<string>;
  editUser$: Observable<User>;
  accessType$: Observable<AccessType>;
  loggedinUserName$: Observable<string>;

  constructor(
    private store: Store<UsersState>,
    private usersService: UsersService
  ) {
    this.error$ = this.store.pipe(select(getError));
    this.editUser$ = this.store.pipe(select(getEditUser));
    this.accessType$ = this.store.pipe(select(getAccessType));
    this.loggedinUserName$ = store.pipe(select(getLoggedinUserName));
  }

  load(sortColumn, direction) {
    return this.usersService.getAllUsers(sortColumn, direction);
  }

  setEditUser(user) {
    this.store.dispatch(new userActions.SetEditUser(user));
  }

  deleteUser(id) {
    this.store.dispatch(new userActions.DeleteUser(id));
  }

  clearEditUser() {
    this.store.dispatch(new userActions.ClearEditUser());
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

  setLoggedinUserName(name) {
    this.store.dispatch(new userActions.SetLoggedInUserName(name));
  }

}
