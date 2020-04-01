import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { getAllUsers, getError, getShowUsername, getCurrentUserId, getCurrentUser } from './users.selectors';
import { Observable } from 'rxjs';
import { User } from '../user';
import * as userActions from './users.actions';

@Injectable({providedIn: 'root'})
export class UsersFacade {

  users$: Observable<User[]>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;

  constructor(private store: Store<UsersState>) {
    this.users$ = this.store.pipe(select(getAllUsers));
    this.error$ = this.store.pipe(select(getError));
    this.showUsername$ = this.store.pipe(select(getShowUsername));
    this.currentUserId$ = this.store.pipe(select(getCurrentUserId));
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
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
}
