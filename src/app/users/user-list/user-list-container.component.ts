import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User, AccessType } from '../../shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserListContainerComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  error$: Observable<string>;
  showUsername$: Observable<boolean>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;
  accessType$: Observable<AccessType>;

  sub: Subscription;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
    private loginService: LoginService
  ) {
    this.users$ = this.usersFacade.users$.pipe(
      map(entitys => Object.keys(entitys).map(k => entitys[k]))
    );
    this.error$ = this.usersFacade.error$;
    this.showUsername$ = this.usersFacade.showUsername$;
    this.currentUserId$ = this.usersFacade.currentUserId$;
    this.currentUser$ = this.usersFacade.currentUser$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.usersFacade.load();
    } else {
      this.router.navigate(['']);
    }

    // this.sub = this.usersFacade.loggedinUserEmail$.subscribe(val => {
    //   if (val) {
    //     this.usersFacade.load();
    //   } else {
    //     this.router.navigate(['']);
    //   }
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  checkChange(value) {
    this.usersFacade.toggleUsername(value);
  }

  setCurrentUser(id) {
    this.usersFacade.setCurrentUserId(id);
  }

  deleteUser(id) {
    this.usersFacade.deleteUser(id);
  }

  addUser() {
    this.usersFacade.setCurrentUserId('0');
    this.router.navigate(['user-edit']);
  }

  editUser() {
    this.router.navigate(['user-edit']);
  }

}
