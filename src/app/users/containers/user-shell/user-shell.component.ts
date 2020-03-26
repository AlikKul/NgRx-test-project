import { Component, OnInit } from '@angular/core';

import { User } from '../../user';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getShowUsername, getAllUsers, getError, getCurrentUserId } from '../../state/users.reducer';
import * as userActions from '../../state/users.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-shell',
  templateUrl: './user-shell.component.html',
  styleUrls: ['./user-shell.component.scss']
})
export class UserShellComponent implements OnInit {

  users$: Observable<User[]>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store.dispatch(new userActions.Load());

    this.users$ = this.store.pipe(select(getAllUsers));
    this.error$ = this.store.pipe(select(getError));
    this.showUsername$ = this.store.pipe(select(getShowUsername));
    this.currentUserId$ = this.store.pipe(select(getCurrentUserId));
  }

  checkChange(value) {
    this.store.dispatch(new userActions.ToggleUsername(value));
  }

  setCurrentUser(id) {
    this.store.dispatch(new userActions.SetCurrentUserId(id));
  }

  addUser() {
    this.store.dispatch(new userActions.SetCurrentUserId('0'));
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

}
