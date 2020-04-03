import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginData, FirebaseAuthResponse } from '../shared/interfaces';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UsersFacade } from '../users/state/users.facade';
import { Observable, of, Subscription } from 'rxjs';

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
    private facade: UsersFacade
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  login(loginData: LoginData) {
    this.sub = this.loginService.login(Object.assign(loginData, {returnSecureToken: true}))
      .subscribe(
        (resp: FirebaseAuthResponse) => {
          this.facade.setLoggedInUserEmail(resp.email);
          this.router.navigate(['users']);
        },
        error => this.loginError$ = of(error.error.error.message)
      );
  }

}
