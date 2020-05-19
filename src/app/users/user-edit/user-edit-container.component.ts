import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit-container',
  template: `
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
    private modalService: NgbModal
  ) {
    this.selectedUser$ = this.usersFacade.selectedUser$;
  }

  ngOnInit() {}

  addNewUser(user: User) {
    this.usersFacade.addNewUser(user);
    this.modalService.dismissAll();
  }

  updateUser(updatedUser) {
    this.usersFacade.updateUser(updatedUser);
    this.modalService.dismissAll();
  }

  cancelChanges() {
    this.usersFacade.clearSelectedUser();
    this.modalService.dismissAll();
  }

}
