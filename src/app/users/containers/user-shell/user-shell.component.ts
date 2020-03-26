import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../user';
import { UsersFacade } from '../../state/users.facade';

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
    private usersFacade: UsersFacade
  ) {}

  ngOnInit() {
    this.usersFacade.load();

    this.users$ = this.usersFacade.users$;
    this.error$ = this.usersFacade.error$;
    this.showUsername$ = this.usersFacade.showUsername$;
    this.currentUserId$ = this.usersFacade.currentUserId$;
    this.currentUser$ = this.usersFacade.currentUser$;
  }

  checkChange(value) {
    this.usersFacade.toggleUsername(value);
  }

  setCurrentUser(id) {
    this.usersFacade.setCurrentUserId(id);
  }

  addUser() {
    this.usersFacade.setCurrentUserId('0');
  }

  deleteUser(id) {
    this.usersFacade.deleteUser(id);
  }

  clearCurruntUserId() {
    this.usersFacade.clearCurruntUserId();
  }

  updateUser(updatedUser) {
    this.usersFacade.updateUser(updatedUser);
  }

}
