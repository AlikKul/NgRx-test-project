import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFacade } from 'src/app/users/state/users.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName$: Observable<string>;
  accessType$: Observable<string>;

  constructor(
    private router: Router,
    private usersFacade: UsersFacade
  ) { }

  ngOnInit() {
    this.userName$ = this.usersFacade.loggedinUserName$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  logout() {
    this.router.navigate(['']);
  }

}
