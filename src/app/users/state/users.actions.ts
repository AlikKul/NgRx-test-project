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
  DeleteUser = '[Users] Delete User'
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

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DeleteUser;

  constructor(public payload: string) {}
}

export type UsersActions = ToggleUsername
  | SetCurrentUserId
  | ClearCurrentUserId
  | Load
  | LoadSuccess
  | LoadFail
  | SaveUser
  | DeleteUser;
