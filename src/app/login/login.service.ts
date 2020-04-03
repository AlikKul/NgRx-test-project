import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../shared/interfaces';

@Injectable({providedIn: 'root'})
export class LoginService {

  apiKey = 'AIzaSyBbnI8xmRCs8P2HoxuczP3MESM-j8mISqo';

  constructor(
    private http: HttpClient
  ) {}

  login(loginData: LoginData) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, loginData);
  }
}
