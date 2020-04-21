import { Action } from '@ngrx/store';
import { User, AccessType, SortColumn } from '../../shared/interfaces';

export enum UsersActionTypes {
  SetEditUser = '[Users] Set Edit User',
  ClearEditUser = '[Users] Clear Edit User',
  LoadFail = '[Users] Load Fail',
  SaveUser = '[Users] Save User',
  SaveUserSuccess = '[Users] Save User Success',
  SaveUserFail = '[Users] Save User Fail',
  AddNewUser = '[Uers] Add New User',
  AddNewUserSuccess = '[Uers] Add New User Success',
  AddNewUserFail = '[Uers] Add New User Fail',
  DeleteUser = '[Users] Delete User',
  DeleteUserSuccess = '[Users] Delete User Success',
  DeleteUserFail = '[Users] Delete User Fail',
  SetLoggedInUserName = '[Users] Set Loggedin User Name',
  SetAccessType = '[Users] Set Access Type',
}

export class SetEditUser implements Action {
  readonly type = UsersActionTypes.SetEditUser;
  constructor(public payload: User) {}
}

export class ClearEditUser implements Action {
  readonly type = UsersActionTypes.ClearEditUser;
}

export class LoadFail implements Action {
  readonly type = UsersActionTypes.LoadFail;
  constructor(public payload: string) {}
}

export class SaveUser implements Action {
  readonly type = UsersActionTypes.SaveUser;

  constructor(public payload: User) {}
}

export class SaveUserSuccess implements Action {
  readonly type = UsersActionTypes.SaveUserSuccess;
}

export class SaveUserFail implements Action {
  readonly type = UsersActionTypes.SaveUserFail;
  constructor(public payload: string) {}
}

export class AddNewUser implements Action {
  readonly type = UsersActionTypes.AddNewUser;
  constructor(public payload: User) {}
}

export class AddNewUserSuccess implements Action {
  readonly type = UsersActionTypes.AddNewUserSuccess;
  // constructor(public payload: User) {}
}

export class AddNewUserFail implements Action {
  readonly type = UsersActionTypes.AddNewUserFail;
  constructor(public payload: string) {}
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;
  constructor(public payload: string) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DeleteUserSuccess;
}

export class DeleteUserFail implements Action {
  readonly type = UsersActionTypes.DeleteUserFail;
  constructor(public payload: string) {}
}

export class SetLoggedInUserName implements Action {
  readonly type = UsersActionTypes.SetLoggedInUserName;
  constructor(public payload: string) {}
}

export class SetAccessType implements Action {
  readonly type = UsersActionTypes.SetAccessType;
  constructor(public payload: AccessType) {}
}

export type UsersActions = SetEditUser
  | ClearEditUser
  | LoadFail
  | SaveUser
  | SaveUserSuccess
  | SaveUserFail
  | AddNewUser
  | AddNewUserSuccess
  | AddNewUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail
  | SetLoggedInUserName
  | SetAccessType;
