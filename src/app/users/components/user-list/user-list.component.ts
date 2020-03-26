import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() showUsername: boolean;
  @Input() error: string;
  @Output() showUsernameFlag = new EventEmitter<boolean>();
  @Output() selectedUserId = new EventEmitter<string>();
  @Output() initializeNewUser = new EventEmitter<void>();
  @Output() deleteUserId = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  selectUser(id) {
    this.selectedUserId.emit(id);
  }

  checkChange(value) {
    this.showUsernameFlag.emit(value);
  }

  addUser() {
    this.initializeNewUser.emit();
  }

  deleteUser(id) {
    this.deleteUserId.emit(id);
  }

}
