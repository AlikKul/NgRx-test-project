import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-container',
  template: `
    <app-header></app-header>

    <app-user-edit
      [selectedUser]="selectedUser$ | async"
      (addNewUser)="addNewUser($event)"
      (updatedUser)="updateUser($event)"
      (cancelChanges)="cancelChanges()"
    ></app-user-edit>
  `
})
export class UserEditContainerComponent implements OnInit {

  selectedUser$: Observable<User>;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$;
  }

  ngOnInit() {}

  addNewUser(user: User) {
    this.usersFacade.addNewUser(user);
  }

  updateUser(updatedUser) {
    this.usersFacade.updateUser(updatedUser);
  }

  cancelChanges() {
    this.usersFacade.clearSelectedUser();
    this.router.navigate(['user-list']);
  }

}
