import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {}

  getAllUsers() {
    return this.http.get('https://ngrx-test-project.firebaseio.com/users.json')
      .pipe(map(item => Object.values(item)));
  }

  saveUser(id, user) {
    return this.http.patch(`https://ngrx-test-project.firebaseio.com/users/${id}.json`, user);
  }
}
