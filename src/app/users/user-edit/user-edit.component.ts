import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User, AccessType } from '../../shared/interfaces';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUserId: string;
  @Input() currentUser: User;
  @Input() accessType: AccessType;
  @Output() addNewUser = new EventEmitter<User>();
  @Output() updatedUser = new EventEmitter<User>();
  @Output() cancelChanges = new EventEmitter<void>();

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl(''),
      accessType: new FormControl('')
    });
    if (this.currentUserId !== '0') {
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
    this.cancelChanges.emit();
  }

}
