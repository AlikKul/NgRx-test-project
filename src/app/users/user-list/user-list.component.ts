import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { User, AccessType } from '../../shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() error: string;
  @Input() accessType: AccessType;
  @Output() initializeNewUser = new EventEmitter<void>();
  @Output() deleteUserId = new EventEmitter<string>();
  @Output() editUserId = new EventEmitter<string>();

  name: string;
  id: string;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  addUser() {
    this.initializeNewUser.emit();
  }

  showDeleteModal(content, user: User) {
    this.modalService.open(content, { centered: true });
    this.name = user.name;
    this.id = user.id;
  }

  deleteConfirmed() {
    this.deleteUserId.emit(this.id);
    this.modalService.dismissAll();
  }

  deleteCanceled() {
    this.modalService.dismissAll();
  }

  editUser(id) {
    this.editUserId.emit(id);
  }

}
