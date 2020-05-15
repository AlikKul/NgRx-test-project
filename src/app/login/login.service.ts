import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../shared/interfaces';
import { firebaseConfig } from '../../environments/env';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(
    private usersService: UsersService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

  login(loginData: LoginData) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password))
      .pipe(
        mergeMap(resp => {
          return this.usersService.getLoggedInUser(resp.user.email);
        })
      );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  isAuthenticated() {
    // To Do
  }
}
