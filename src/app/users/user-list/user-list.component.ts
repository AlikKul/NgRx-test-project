import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getShowUsername, getAllUsers, getError, getCurrentUserId } from '../state/users.reducer';
import * as userActions from '../state/users.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId: string;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new userActions.Load());

    this.users$ = this.store.pipe(select(getAllUsers));
    this.error$ = this.store.pipe(select(getError));
    this.showUsername$ = this.store.pipe(select(getShowUsername));
  }

  checkChange(value) {
    this.store.dispatch(new userActions.ToggleUsername(value));
  }

  setCurrentUser(id) {
    this.currentUserId = id;
    this.store.dispatch(new userActions.SetCurrentUserId(id));
  }

  deleteUser() {
    const currentUserId = this.getCurrenUserIdFromState();
    if (currentUserId) {
      this.store.dispatch(new userActions.DeleteUser(currentUserId));
    }
  }

  getCurrenUserIdFromState() {
    let currentUserId: string;
    this.store.pipe(select(getCurrentUserId))
      .subscribe(id => currentUserId = id);
    return currentUserId;
  }

}
