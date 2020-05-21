import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginData, User } from '../shared/interfaces';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable, of, Subscription } from 'rxjs';
import { GlobalFacade } from '../shared/state/global.facade';

@Component({
  selector: 'app-login-container',
  template: `
    <app-login
      [errorLogin]="loginError$ | async"
      (loginData)=login($event);
    ></app-login>
  `
})

export class LoginContainerComponent implements OnInit, OnDestroy {

  loginError$: Observable<string>;
  sub: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private globalFacade: GlobalFacade
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  login(loginData: LoginData) {
    this.sub = this.loginService.login(loginData)
      .subscribe((resp: User[]) => {
        this.globalFacade.setLoggedInUserName(resp[0].name);
        this.globalFacade.setAccessType(resp[0].accessType);
        this.router.navigate(['dashboard']);
      },
      error => {
        this.loginError$ = of(error.message);
      }
      );
  }

}
