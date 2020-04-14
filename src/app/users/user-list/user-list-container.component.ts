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
    this.currentUserId$ = this.usersFacade.currentUserId$;
    this.currentUser$ = this.usersFacade.currentUser$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.usersFacade.load();
    } else {
      localStorage.clear();
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

  deleteUser(id) {
    this.usersFacade.deleteUser(id);
  }

  editUser(id) {
    this.usersFacade.setCurrentUserId(id);
    this.router.navigate(['user-edit']);
  }

  addUser() {
    this.usersFacade.setCurrentUserId('0');
    this.router.navigate(['user-edit']);
  }

}
