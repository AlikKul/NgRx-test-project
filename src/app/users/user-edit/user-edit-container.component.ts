import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AccessType } from 'src/app/shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-container',
  templateUrl: './user-edit-container.component.html',
})
export class UserEditContainerComponent implements OnInit {

  users$: Observable<User[]>;
  currentUserId$: Observable<string>;
  currentUser$: Observable<User>;
  accessType$: Observable<AccessType>;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserId$ = this.usersFacade.currentUserId$;
    this.currentUser$ = this.usersFacade.currentUser$;
    this.accessType$ = this.usersFacade.accessType$;
  }

  addNewUser(user: User) {
    this.usersFacade.addNewUser(user);
    this.router.navigate(['user-list']);
  }

  updateUser(updatedUser) {
    this.usersFacade.updateUser(updatedUser);
    this.router.navigate(['user-list']);
  }

  cancelChanges() {
    this.usersFacade.clearCurruntUserId();
    this.router.navigate(['user-list']);
  }

}
