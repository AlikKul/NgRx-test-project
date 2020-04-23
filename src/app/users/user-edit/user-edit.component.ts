import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { User, AccessType } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

  @Input() editUser: User;
  @Output() addNewUser = new EventEmitter<User>();
  @Output() updatedUser = new EventEmitter<User>();
  @Output() cancelChanges = new EventEmitter<void>();

  form: FormGroup;

  minNameLength = 5;
  minUserNameLength = 2;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      id: new FormControl({value: '', disabled: true}),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minNameLength)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minUserNameLength)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      website: new FormControl(''),
      accessType: new FormControl('visitor')
    });

    if (!this.editUser && this.editUser !== null) {
      this.router.navigate(['user-list']);
      return;
    }
    if (this.editUser !== null) {
      this.form.patchValue(this.editUser);
    }

  }

  get name() {
    return this.form.get('name');
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  submit() {
    if (!this.form.get('id').value) {
      this.addNewUser.emit(this.form.value);
      return;
    }
    this.updatedUser.emit({
      ...this.form.value,
      id: this.editUser.id
    });
  }

  cancel() {
    this.cancelChanges.emit();
  }

}
