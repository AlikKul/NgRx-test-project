import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, FirebaseAuthResponse } from '../shared/interfaces';
import { firebaseConfig } from '../../environments/env';
import { tap, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({providedIn: 'root'})
export class LoginService {

  private apiKey = firebaseConfig.apiKey;

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) {}

  login(loginData: LoginData): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, loginData)
      .pipe(
        tap(this.setToken),
        mergeMap((resp: FirebaseAuthResponse) => {
          return this.usersService.getLoggedInUser(resp.email);
        })
      );
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      localStorage.setItem('userEmail', response.email);
      localStorage.setItem('idToken', response.idToken);
      localStorage.setItem('tokenExpDate', (new Date().getTime() + parseInt(response.expiresIn) * 1000).toString());
    } else {
      localStorage.clear();
    }
  }

  isAuthenticated() {
    if (new Date() > new Date(parseInt(localStorage.getItem('tokenExpDate')))) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
