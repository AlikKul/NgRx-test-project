import { Action } from '@ngrx/store';
import { User, AccessType, Purchase, UserSortEvent } from '../../shared/interfaces';

export enum UsersActionTypes {
  SetSelectedUser = '[Users] Set Selected User',
  ClearSelectedUser = '[Users] Clear Selected User',
  GetUsers = '[Users] Get Users',
  GetUsersSuccess = '[Users] Get Users Success',
  GetUsersFail = '[Users] Get Users Fail',
  ClearUsers = '[Users] Clear Users',
  SetNumberOfUsersToDisplay = '[Users] Set Number Of Users To Display',
  UpdateUser = '[Users] Update User',
  UpdateUserSuccess = '[Users] Update User Success',
  UpdateUserFail = '[Users] Update User Fail',
  AddNewUser = '[Users] Add New User',
  AddNewUserSuccess = '[Users] Add New User Success',
  AddNewUserFail = '[Users] Add New User Fail',
  DeleteUser = '[Users] Delete User',
  DeleteUserSuccess = '[Users] Delete User Success',
  DeleteUserFail = '[Users] Delete User Fail',
  AddPurchase = '[Users] Add Purchase',
  AddPurchaseSuccess = '[Users] Add Purchase Success',
  AddPurchaseFail = '[Users] Add Purchase Fail',
  GetUsersPurchases = '[Users] Get Users Purchases',
  GetUsersPurchasesSuccess = '[Users] Get Users Purchases Success',
  GetUsersPurchasesFail = '[Users] Get Users Purchases Fail',
  ClearUsersPurchases = '[Users] Clear Users Purchases',
  SetLoggedInUserName = '[Users] Set LoggedIn User Name',
  SetAccessType = '[Users] Set Access Type',
}

export class SetSelectedUser implements Action {
  readonly type = UsersActionTypes.SetSelectedUser;
  constructor(public payload: User) {}
}

export class ClearSelectedUser implements Action {
  readonly type = UsersActionTypes.ClearSelectedUser;
}

export class GetUsers implements Action {
  readonly type = UsersActionTypes.GetUsers;
  constructor(public payload: UserSortEvent) {}
}

export class GetUsersSuccess implements Action {
  readonly type = UsersActionTypes.GetUsersSuccess;
  constructor(public payload: User[]) {}
}

export class GetUsersFail implements Action {
  readonly type = UsersActionTypes.GetUsersFail;
  constructor(public payload: string) {}
}

export class ClearUsers implements Action {
  readonly type = UsersActionTypes.ClearUsers;
}

export class SetNumberOfUsersToDisplay implements Action {
  readonly type = UsersActionTypes.SetNumberOfUsersToDisplay;
  constructor(public payload: number) {}
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UpdateUser;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UpdateUserSuccess;
}

export class UpdateUserFail implements Action {
  readonly type = UsersActionTypes.UpdateUserFail;
  constructor(public payload: string) {}
}

export class AddNewUser implements Action {
  readonly type = UsersActionTypes.AddNewUser;
  constructor(public payload: User) {}
}

export class AddNewUserSuccess implements Action {
  readonly type = UsersActionTypes.AddNewUserSuccess;
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

export class AddPurchase implements Action {
  readonly type = UsersActionTypes.AddPurchase;
  constructor(public payload: {userId: string, purchase: Purchase}) {}
}

export class AddPurchaseSuccess implements Action {
  readonly type = UsersActionTypes.AddPurchaseSuccess;
}

export class AddPurchaseFail implements Action {
  readonly type = UsersActionTypes.AddPurchaseFail;
  constructor(public payload: string) {}
}

export class GetUsersPurchases implements Action {
  readonly type = UsersActionTypes.GetUsersPurchases;
  constructor(public payload: string) {}
}

export class GetUsersPurchasesSuccess implements Action {
  readonly type = UsersActionTypes.GetUsersPurchasesSuccess;
  constructor(public payload: Purchase[]) {}
}

export class GetUsersPurchasesFail implements Action {
  readonly type = UsersActionTypes.GetUsersPurchasesFail;
  constructor(public payload: string) {}
}

export class ClearUsersPurchases implements Action {
  readonly type = UsersActionTypes.ClearUsersPurchases;
}

export class SetLoggedInUserName implements Action {
  readonly type = UsersActionTypes.SetLoggedInUserName;
  constructor(public payload: string) {}
}

export class SetAccessType implements Action {
  readonly type = UsersActionTypes.SetAccessType;
  constructor(public payload: AccessType) {}
}

export type UsersActions = SetSelectedUser
  | ClearSelectedUser
  | GetUsers
  | GetUsersSuccess
  | GetUsersFail
  | ClearUsers
  | SetNumberOfUsersToDisplay
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | AddNewUser
  | AddNewUserSuccess
  | AddNewUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail
  | AddPurchase
  | AddPurchaseSuccess
  | AddPurchaseFail
  | GetUsersPurchases
  | GetUsersPurchasesSuccess
  | GetUsersPurchasesFail
  | ClearUsersPurchases
  | SetLoggedInUserName
  | SetAccessType;
