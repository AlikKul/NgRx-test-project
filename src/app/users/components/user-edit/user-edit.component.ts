import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User } from '../../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() currentUser: User;
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
