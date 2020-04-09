import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { User, AccessType } from '../../../shared/interfaces';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() showUsername: boolean;
  @Input() error: string;
  @Input() accessType: AccessType;
  @Output() showUsernameFlag = new EventEmitter<boolean>();
  @Output() selectedUserId = new EventEmitter<string>();
  @Output() initializeNewUser = new EventEmitter<void>();
  @Output() deleteUserId = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  selectUser(id) {
    if (this.accessType !== 'visitor') {
      this.selectedUserId.emit(id);
    }
  }

  checkChange(value) {
    this.showUsernameFlag.emit(value);
  }

  addUser() {
    this.initializeNewUser.emit();
  }

  deleteUser() {
    this.deleteUserId.emit(this.currentUserId);
  }

}
