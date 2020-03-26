import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getCurrentUserId, getAllUsers } from '../../state/users.reducer';
import { User } from '../../user';
import { ClearCurrentUserId, SaveUser } from '../../state/users.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Output() updatedUser = new EventEmitter<User>();
  @Output() clearCurruntUserId = new EventEmitter<void>();

  form: FormGroup;
  currentUser: User;

  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl('')
    });

  }

  ngOnChanges() {

    this.currentUser = this.users.find(user => user.id === this.currentUserId);

    if (!this.currentUser) {
      this.currentUser = {
        id: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      };
    }
    this.form.patchValue({
      id: this.currentUser.id,
      name: this.currentUser.name,
      username: this.currentUser.username,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      website: this.currentUser.website
    });
  }

  submit() {
    this.updatedUser.emit({
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      website: this.form.get('website').value
    });
  }

  cancel() {
    this.clearCurruntUserId.emit();
  }

}
