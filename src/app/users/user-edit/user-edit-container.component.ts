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
      [editUser]="editUser$ | async"
      (addNewUser)="addNewUser($event)"
      (updatedUser)="updateUser($event)"
      (cancelChanges)="cancelChanges()"
    ></app-user-edit>
  `
})
export class UserEditContainerComponent implements OnInit {

  editUser$: Observable<User>;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
  ) {
    this.editUser$ = this.usersFacade.editUser$;
  }

  ngOnInit() {}

  addNewUser(user: User) {
    this.usersFacade.addNewUser(user);
    this.router.navigate(['user-list']);
  }

  updateUser(updatedUser) {
    this.usersFacade.updateUser(updatedUser);
    this.router.navigate(['user-list']);
  }

  cancelChanges() {
    this.usersFacade.clearEditUser();
    this.router.navigate(['user-list']);
  }

}
