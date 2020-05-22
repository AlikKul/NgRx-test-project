import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalFacade } from '../state/global.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName$: Observable<string>;
  accessType$: Observable<string>;
  showLoader$: Observable<boolean>;

  constructor(
    private router: Router,
    private globalFacade: GlobalFacade
  ) {
    this.userName$ = this.globalFacade.loggedInUserName$;
    this.accessType$ = this.globalFacade.accessType$;
    this.showLoader$ = this.globalFacade.showLoader$;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  navToDashboard() {
    this.router.navigate(['dashboard']);
  }

  navToProductList() {
    this.router.navigate(['product-list']);
  }

  navToUserList() {
    this.router.navigate(['user-list']);
  }

  logout() {
    this.router.navigate(['']);
  }

}
