import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getCurrentUserId, getAllUsers } from '../state/users.reducer';
import { User } from '../user';
import { ClearCurrentUserId, SaveUser } from '../state/users.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;
  currentUser: User;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl('')
    });

    this.store.pipe(select(getCurrentUserId)).subscribe(id => this.displayCurrentUser(id));

  }

  displayCurrentUser(id) {
    this.store.pipe(select(getAllUsers))
      .subscribe(users => this.currentUser = users.find(user => user.id === id));
    if (this.currentUser) {
      this.form.patchValue({
        id: this.currentUser.id,
        name: this.currentUser.name,
        username: this.currentUser.username,
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        website: this.currentUser.website
      });
    }
  }

  submit() {
    const updatedUser: User = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      website: this.form.get('website').value
    };

    this.store.dispatch(new SaveUser(updatedUser));
  }

  cancel() {
    this.store.dispatch(new ClearCurrentUserId());
  }

}
