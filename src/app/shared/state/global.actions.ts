import { Action } from '@ngrx/store';

export enum GlobalActionsTypes {
  SetAlert = '[Global] Set Alert',
  ClearAlert = '[Global] Clear Alert'
}

export class SetAlert implements Action {
  readonly type = GlobalActionsTypes.SetAlert;
  constructor(public payload: string) {}
}

export class ClearAlert implements Action {
  readonly type = GlobalActionsTypes.ClearAlert;
}

export type GlobalActions = SetAlert
  | ClearAlert;
