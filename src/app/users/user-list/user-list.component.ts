import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, Directive, ViewChildren, QueryList } from '@angular/core';
import { User, SortDirection, SortColumn, SortEvent } from '../../shared/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

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
  @Input() currentUserId: string;
  @Input() error: string;
  @Input() accessType: string;
  @Output() initializeNewUser = new EventEmitter<void>();
  @Output() deleteUserId = new EventEmitter<string>();
  @Output() selectedUser = new EventEmitter<User>();
  @Output() sort = new EventEmitter<SortEvent>();

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

  edit(user) {
    this.selectedUser.emit(user);
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sort.emit({column, direction});
  }

  showPurchases(user: User) {}

}
