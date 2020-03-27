import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User } from '../../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() currentUser: User;
  @Output() addNewUser = new EventEmitter<User>();
  @Output() updatedUser = new EventEmitter<User>();
  @Output() clearCurruntUserId = new EventEmitter<void>();

  form: FormGroup;

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
    if (this.currentUserId) {
      this.form.get('id').patchValue(this.currentUser.id);
      this.form.get('name').patchValue(this.currentUser.name);
      this.form.get('username').patchValue(this.currentUser.username);
      this.form.get('email').patchValue(this.currentUser.email);
      this.form.get('phone').patchValue(this.currentUser.phone);
      this.form.get('website').patchValue(this.currentUser.website);
    }
  }

  submit() {
    const user: User = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      website: this.form.get('website').value
    };
    if (this.currentUserId === '0') {
      this.addNewUser.emit(user);
    } else {
      this.updatedUser.emit(user);
    }
  }

  cancel() {
    this.clearCurruntUserId.emit();
  }

}
