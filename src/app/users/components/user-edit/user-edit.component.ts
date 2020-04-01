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
      this.form.patchValue(this.currentUser);
    }
  }

  submit() {
    if (this.currentUserId === '0') {
      this.addNewUser.emit(this.form.value);
    } else {
      this.updatedUser.emit(this.form.value);
    }
  }

  cancel() {
    this.clearCurruntUserId.emit();
  }

}
