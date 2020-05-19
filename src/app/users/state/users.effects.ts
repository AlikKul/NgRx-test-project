import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import * as usersActions from './users.actions';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { User, Purchase, UserSortEvent } from '../../shared/interfaces';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router
  ) { }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.GetUsers),
    map((action: usersActions.GetUsers) => action.payload),
    switchMap((sortEvent: UserSortEvent) =>
      this.usersService.getUsers(sortEvent).pipe(
        map((users: User[]) => (new usersActions.GetUsersSuccess(users))),
        catchError(error => of(new usersActions.GetUsersFail(error)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.UpdateUser),
    map((action: usersActions.UpdateUser) => action.payload),
    switchMap((user: User) =>
      this.usersService.updateUser(user).pipe(
        map(() => (new usersActions.UpdateUserSuccess())),
        tap(() => this.router.navigate(['user-list'])),
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
        tap(() => this.router.navigate(['user-list'])),
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

  @Effect()
  addPurchase$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddPurchase),
    map((action: usersActions.AddPurchase) => action.payload),
    switchMap((purchase: {userId: string, purchase: Purchase, totalMoneySpent: number}) =>
      this.usersService.addPurchase(purchase).pipe(
        map(() => (new usersActions.AddPurchaseSuccess())),
        tap(() => this.router.navigate(['user-purchases'])),
        catchError(error => of(new usersActions.AddPurchaseFail(error)))
      )
    )
  );

}
