import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginData, FirebaseAuthResponse, AccessType } from '../shared/interfaces';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UsersFacade } from '../users/state/users.facade';
import { Observable, of, Subscription } from 'rxjs';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html'
})
export class LoginContainerComponent implements OnInit, OnDestroy {

  loginError$: Observable<string>;
  sub: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private facade: UsersFacade,
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  login(loginData: LoginData) {
    this.sub = this.loginService.login(Object.assign(loginData, {returnSecureToken: true}))
      .subscribe(
        (resp: FirebaseAuthResponse) => {
          localStorage.setItem('loggedInUserEmail', resp.email);
          this.router.navigate(['user-list']);
        },
        error => this.loginError$ = of(error.error.error.message)
      );
  }

}
