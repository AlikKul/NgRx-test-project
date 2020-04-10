export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  accessType: AccessType;
}

export interface FirebaseResponse {
  name: string;
}

export interface FirebaseAuthResponse {
  email: string;
  idToken: string;
  expiresIn: string;
}

export interface LoginData {
  email: string;
  password: string;
  returnSecureToken: true;
}

export enum AccessType {
  Visitor = 'visitor',
  User = 'user',
  Admin = 'admin'
}
