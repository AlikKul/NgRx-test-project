export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  accessType: AccessType;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Purchase {
  id?: string;
  date: string;
  location: string;
  purchasedItems: string[];
}

export interface PurchaseDetailsQuery {
  userId: string;
  purchaseId: string;
}

export interface PurchasedItem {
  id: string;
}

export interface LoggedInUserInfo {
  name: string;
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
  Admin = 'admin'
}

export type SortDirection = 'asc' | 'desc' | '';

export type UserSortColumn = keyof User | '';
export interface UserSortEvent {
  column: UserSortColumn;
  direction: SortDirection;
}

export type ProductSortColumn = keyof Product | '';
export interface ProductSortEvent {
  column: ProductSortColumn;
  direction: SortDirection;
}
