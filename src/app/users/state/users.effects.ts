import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import * as usersActions from './users.actions';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import { User, Purchase, UserSortEvent } from '../../shared/interfaces';
import { of, Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as globalActions from '../../shared/state/global.actions';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store
  ) { }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsers),
    map((action: usersActions.GetUsers) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((sortEvent: UserSortEvent) =>
      this.usersService.getUsers(sortEvent).pipe(
        map((users: User[]) => (new usersActions.GetUsersSuccess(users))),
        catchError(error => of(new usersActions.GetUsersFail(error)))
      )
    )
  );

  @Effect()
  getUsersSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersSuccess),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  getUsersFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.UpdateUser),
    map((action: usersActions.UpdateUser) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((user: User) =>
      this.usersService.updateUser(user).pipe(
        map(() => (new usersActions.UpdateUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error)))
      )
    )
  );

  @Effect()
  updateUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.UpdateUserSuccess),
    mergeMap(() => [
      new globalActions.SetAlert('User successfully updated.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  updateUserFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.UpdateUserFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  addNewUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUser),
    map((action: usersActions.AddNewUser) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((user: User) =>
      this.usersService.addNewUser(user).pipe(
        map(() => (new usersActions.AddNewUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error)))
      )
    )
  );

  @Effect()
  addNewUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUserSuccess),
    mergeMap(() => [
      new globalActions.SetAlert('New user successfully added.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  addNewUserFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUserFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUser),
    map((action: usersActions.DeleteUser) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((id: string) =>
      this.usersService.deleteUser(id).pipe(
        map(() => (new usersActions.DeleteUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error.message)))
      )
    )
  );

  @Effect()
  deleteUserSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUserSuccess),
    mergeMap(() => [
      new globalActions.SetAlert('User deleted.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  deleteUserFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUserFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  getUsersPurchases$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersPurchases),
    map((action: usersActions.GetUsersPurchases) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((id: string) =>
      this.usersService.getAllPurchases(id).pipe(
        map((purchases: Purchase[]) => (new usersActions.GetUsersPurchasesSuccess(purchases))),
        catchError(error => of(new usersActions.GetUsersPurchasesFail(error.message)))
      )
    )
  );

  getUsersPurchasesSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersPurchasesSuccess),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  getUsersPurchasesFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersPurchasesFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  addPurchase$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddPurchase),
    map((action: usersActions.AddPurchase) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((purchase: {userId: string, purchase: Purchase, totalMoneySpent: number}) =>
      this.usersService.addPurchase(purchase).pipe(
        map(() => (new usersActions.AddPurchaseSuccess())),
        catchError(error => of(new usersActions.AddPurchaseFail(error)))
      )
    )
  );

  @Effect()
  addPurchaseSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddPurchaseSuccess),
    mergeMap(() => [
      new globalActions.SetAlert('Purchase successfully added.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  addPurchaseFail$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddPurchaseFail),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

}
