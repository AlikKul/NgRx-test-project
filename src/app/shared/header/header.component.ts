import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName$: Observable<string>;
  accessType$: Observable<string>;
  sub: Subscription;

  constructor(
    private router: Router,
    private usersFacade: UsersFacade
  ) {
    this.userName$ = this.usersFacade.loggedinUserName$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  ngOnInit() {
    this.sub = this.userName$.subscribe(userName => {
      if (!userName) {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navToPoductList() {
    this.router.navigate(['product-list']);
  }

  navToUserList() {
    this.router.navigate(['user-list']);
  }

  logout() {
    this.router.navigate(['']);
  }

}
