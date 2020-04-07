import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User, AccessType } from '../../../shared/interfaces';
import { UsersFacade } from '../../state/users.facade';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-shell',
  templateUrl: './user-shell.component.html',
  styleUrls: ['./user-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserShellComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;
  accessType$: Observable<AccessType>;

  sub: Subscription;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.usersFacade.loggedinUserEmail$.subscribe(val => {
      if (!val) {
        this.router.navigate(['']);
      }
    });
    this.usersFacade.load();

    this.users$ = this.usersFacade.users$.pipe(
      map(entitys => Object.keys(entitys).map(k => entitys[k]))
    );
    this.error$ = this.usersFacade.error$;
    this.showUsername$ = this.usersFacade.showUsername$;
    this.currentUserId$ = this.usersFacade.currentUserId$;
    this.currentUser$ = this.usersFacade.currentUser$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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

  addNewUser(user: User) {
    this.usersFacade.addNewUser(user);
  }

}
