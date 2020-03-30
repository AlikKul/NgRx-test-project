import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UsersActionTypes {
  ToggleUsername = '[Users] Toggle Username',
  SetCurrentUserId = '[Users] Set Current User ID',
  ClearCurrentUserId = '[Users] Clear Current User Id',
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Success',
  LoadFail = '[Users] Load Fail',
  SaveUser = '[Users] Save User',
  SaveUserSuccess = '[Users] Save User Success',
  SaveUserFail = '[Users] Save User Fail',
  AddNewUser = '[Uers] Add New User',
  AddNewUserSuccess = '[Uers] Add New User Success',
  AddNewUserFail = '[Uers] Add New User Fail',
  DeleteUser = '[Users] Delete User',
  DeleteUserSuccess = '[Users] Delete User Success',
  DeleteUserFail = '[Users] Delete User Fail'
}

export class ToggleUsername implements Action {
  readonly type = UsersActionTypes.ToggleUsername;

  constructor(public payload: boolean) {}
}

export class SetCurrentUserId implements Action {
  readonly type = UsersActionTypes.SetCurrentUserId;

  constructor(public payload: string) {}
}

export class ClearCurrentUserId implements Action {
  readonly type = UsersActionTypes.ClearCurrentUserId;
}

export class Load implements Action {
  readonly type = UsersActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = UsersActionTypes.LoadSuccess;

  constructor(public payload: User[]) {}
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

  constructor(public payload: User) {}
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

  constructor(public payload: User) {}
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

  constructor(public payload: string) {}
}

export class DeleteUserFail implements Action {
  readonly type = UsersActionTypes.DeleteUserFail;

  constructor(public payload: string) {}
}

export type UsersActions = ToggleUsername
  | SetCurrentUserId
  | ClearCurrentUserId
  | Load
  | LoadSuccess
  | LoadFail
  | SaveUser
  | SaveUserSuccess
  | SaveUserFail
  | AddNewUser
  | AddNewUserSuccess
  | AddNewUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail;
