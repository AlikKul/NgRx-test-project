import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, AccessType } from 'src/app/shared/interfaces';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit-container',
  templateUrl: './user-edit-container.component.html',
})
export class UserEditContainerComponent implements OnInit {

  users$: Observable<User[]>;
  editUser$: Observable<User>;
  accessType$: Observable<AccessType>;

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
  ) {
    this.editUser$ = this.usersFacade.editUser$;
    this.accessType$ = this.usersFacade.accessType$;
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
