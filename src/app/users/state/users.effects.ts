import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '../users.service';
import * as usersActions from './users.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { User } from '../user';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(usersActions.UsersActionTypes.Load),
    mergeMap((action: usersActions.Load) => this.usersService.getAllUsers().pipe(
      map((users: User[]) => (new usersActions.LoadSuccess(users))),
      catchError(error => of(new usersActions.LoadFail(error.message)))  // of() operator returns an observable
    ))
  );

}
