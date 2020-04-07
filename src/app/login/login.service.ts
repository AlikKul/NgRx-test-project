import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../shared/interfaces';
import { FirebaseAccessData } from '../../environments/env';

@Injectable({providedIn: 'root'})
export class LoginService {

  apiKey = FirebaseAccessData.apiKey;

  constructor(
    private http: HttpClient
  ) {}

  login(loginData: LoginData) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, loginData);
  }
}
