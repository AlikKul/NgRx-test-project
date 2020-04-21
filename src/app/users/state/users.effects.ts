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
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.SaveUser),
    map((action: usersActions.SaveUser) => action.payload),
    mergeMap((user: User) =>
      this.usersService.saveUser(user)
      .then(() => (new usersActions.SaveUserSuccess()))
      .catch(error => (new usersActions.AddNewUserFail(error)))
    )
  );

  @Effect()
  addNewUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.AddNewUser),
    map((action: usersActions.AddNewUser) => action.payload),
    mergeMap((user: User) =>
      this.usersService.addNewUser(user)
        .then(() => (new usersActions.AddNewUserSuccess()))
        .catch(error => (new usersActions.AddNewUserFail(error)))
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.DeleteUser),
    map((action: usersActions.DeleteUser) => action.payload),
    mergeMap((id: string) =>
      this.usersService.deleteUser(id)
      .then(() => (new usersActions.DeleteUserSuccess()))
      .catch(error => new usersActions.AddNewUserFail(error.message))
    )
  );

}
