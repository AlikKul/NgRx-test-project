import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, Directive, ViewChildren, QueryList } from '@angular/core';
import { User, SortDirection, UserSortColumn, UserSortEvent } from '../../shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditContainerComponent } from '../user-edit/user-edit-container.component';

const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: UserSortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<UserSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserListComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  @Input() users: User[];
  @Input() error: string;
  @Input() alert: string;
  @Input() accessType: string;
  @Output() initializeNewUser = new EventEmitter<void>();
  @Output() deleteUserId = new EventEmitter<string>();
  @Output() edit = new EventEmitter<User>();
  @Output() showPurchases = new EventEmitter<User>();
  @Output() sort = new EventEmitter<UserSortEvent>();

  name: string;
  id: string;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  addUser() {
    this.initializeNewUser.emit();
    this.modalService.open(UserEditContainerComponent);
  }

  editUser(user) {
    this.edit.emit(user);
    this.modalService.open(UserEditContainerComponent);
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

  onSort({column, direction}: UserSortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction !== '') {
      this.sort.emit({column, direction});
    }
  }

  showUserPurchases(user: User) {
    this.showPurchases.emit(user);
  }

}
