import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { getAllUsers, getError, getShowUsername, getCurrentUserId, getCurrentUser, getAccessType } from './users.selectors';
import { Observable } from 'rxjs';
import { User, AccessType } from '../../shared/interfaces';
import * as userActions from './users.actions';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  users$: Observable<any>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;
  accessType$: Observable<AccessType>;

  constructor(private store: Store<UsersState>) {
    this.users$ = this.store.pipe(select(getAllUsers));
    this.error$ = this.store.pipe(select(getError));
    this.showUsername$ = this.store.pipe(select(getShowUsername));
    this.currentUserId$ = this.store.pipe(select(getCurrentUserId));
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
    this.accessType$ = this.store.pipe(select(getAccessType));
  }

  load() {
    this.store.dispatch(new userActions.Load());
  }

  toggleUsername(value) {
    this.store.dispatch(new userActions.ToggleUsername(value));
  }

  setCurrentUserId(id) {
    this.store.dispatch(new userActions.SetCurrentUserId(id));
  }

  deleteUser(id) {
    this.store.dispatch(new userActions.DeleteUser(id));
  }

  clearCurruntUserId() {
    this.store.dispatch(new userActions.ClearCurrentUserId());
  }

  updateUser(updatedUser) {
    this.store.dispatch(new userActions.SaveUser(updatedUser));
  }

  addNewUser(user) {
    this.store.dispatch(new userActions.AddNewUser(user));
  }

  setLoggedInUserEmail(email) {
    this.store.dispatch(new userActions.SetLoggenInUserEmail(email));
  }

  setAccessType(value) {
    this.store.dispatch(new userActions.SetAccessType(value));
  }
}
