import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import * as usersActions from './users.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User, Purchase } from '../../shared/interfaces';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  @Effect()
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.SaveUser),
    map((action: usersActions.SaveUser) => action.payload),
    switchMap((user: User) =>
      this.usersService.saveUser(user).pipe(
        map(() => (new usersActions.SaveUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error)))
      )
    )
  );

  @Effect()
  addNewUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUser),
    map((action: usersActions.AddNewUser) => action.payload),
    switchMap((user: User) =>
      this.usersService.addNewUser(user).pipe(
        map(() => (new usersActions.AddNewUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUser),
    map((action: usersActions.DeleteUser) => action.payload),
    switchMap((id: string) =>
      this.usersService.deleteUser(id).pipe(
        map(() => (new usersActions.DeleteUserSuccess())),
        catchError(error => of(new usersActions.AddNewUserFail(error.message)))
      )
    )
  );

  @Effect()
  getUsersPurchases$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsersPurchases),
    map((action: usersActions.GetUsersPurchases) => action.payload),
    switchMap((id: string) =>
      this.usersService.getAllPurchases(id).pipe(
        map((purchases: Purchase[]) => (new usersActions.GetUsersPurchasesSuccess(purchases))),
        catchError(error => of(new usersActions.GetUsersPurchasesFail(error.message)))
      )
    )
  );

}
