import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}

  getAllUsers() {
    return this.http.get('https://ngrx-test-project.firebaseio.com/users.json')
      .pipe(map(item => Object.values(item)));
  }

  saveUser(user: User) {
    return this.http.patch(`https://ngrx-test-project.firebaseio.com/users/${user.id}.json`, user);
  }

  addNewUser(user: User) {
    return this.http.post('https://ngrx-test-project.firebaseio.com/users.json', user);
  }

  deleteUser(id: string) {
    return this.http.delete(`https://ngrx-test-project.firebaseio.com/users/${id}.json`)
  }
}
