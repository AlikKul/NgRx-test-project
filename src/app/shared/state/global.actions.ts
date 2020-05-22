import { Action } from '@ngrx/store';
import { AccessType } from '../interfaces';

export enum GlobalActionsTypes {
  SetAlert = '[Global] Set Alert',
  ClearAlert = '[Global] Clear Alert',
  SetLoggedInUserName = '[Global] Set LoggedIn User Name',
  SetAccessType = '[Global] Set Access Type',
  SetShowLoader = '[Global] Set Show Loader'
}

export class SetAlert implements Action {
  readonly type = GlobalActionsTypes.SetAlert;
  constructor(public payload: string) {}
}

export class ClearAlert implements Action {
  readonly type = GlobalActionsTypes.ClearAlert;
}

export class SetLoggedInUserName implements Action {
  readonly type = GlobalActionsTypes.SetLoggedInUserName;
  constructor(public payload: string) {}
}

export class SetAccessType implements Action {
  readonly type = GlobalActionsTypes.SetAccessType;
  constructor(public payload: AccessType) {}
}

export class SetShowLoader implements Action {
  readonly type = GlobalActionsTypes.SetShowLoader;
  constructor(public payload: boolean) {}
}

export type GlobalActions = SetAlert
  | ClearAlert
  | SetLoggedInUserName
  | SetAccessType
  | SetShowLoader;
