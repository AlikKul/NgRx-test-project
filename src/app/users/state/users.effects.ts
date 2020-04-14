import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import * as usersActions from './users.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { User, FirebaseResponse } from '../../shared/interfaces';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.Load),
    mergeMap((action: usersActions.Load) => this.usersService.getAllUsers().pipe(
      map((users: User[]) => (new usersActions.LoadSuccess(users))),
      catchError(error => of(new usersActions.LoadFail(error.message)))  // of() operator returns an observable
    ))
  );

  @Effect()
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.SaveUser),
    map((action: usersActions.SaveUser) => action.payload),
    mergeMap((user: User) =>
      this.usersService.saveUser(user).pipe(
        map((updatedUser: User) => (new usersActions.SaveUserSuccess(updatedUser))),
        catchError(error => of(new usersActions.SaveUserFail(error.message)))
      ))
  );

  @Effect()
  addNewUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUser),
    map((action: usersActions.AddNewUser) => action.payload),
    mergeMap((user: User) =>
      this.usersService.addNewUser(user).pipe(
        map((resp: FirebaseResponse) => {
          this.usersService.saveUser({...user, id: resp.name}).subscribe(() => {});
          return {
            ...user,
            id: resp.name
          };
        }),
        map((addedUser: User) => (new usersActions.AddNewUserSuccess(addedUser))),
        catchError(error => of(new usersActions.AddNewUserFail(error.message)))
      ))
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUser),
    map((action: usersActions.DeleteUser) => action.payload),
    mergeMap((id: string) =>
      this.usersService.deleteUser(id).pipe(
        map(() => (new usersActions.DeleteUserSuccess(id))),
        catchError(error => of(new usersActions.AddNewUserFail(error.message)))
      )
    )
  );

}
