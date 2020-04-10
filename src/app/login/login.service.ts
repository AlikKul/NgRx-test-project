import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData, FirebaseAuthResponse } from '../shared/interfaces';
import { FirebaseAccessData } from '../../environments/env';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoginService {

  private apiKey = FirebaseAccessData.apiKey;

  constructor(
    private http: HttpClient
  ) {}

  login(loginData: LoginData) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, loginData)
      .pipe(
        tap(this.setToken)
      );
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
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
