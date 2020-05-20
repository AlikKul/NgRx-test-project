import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as globalActions from './global.actions';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class GlobalEffects {

  constructor(
    private actions$: Actions
  ) {}

  @Effect()
  setAlert$: Observable<Action> = this.actions$.pipe(
    ofType(globalActions.GlobalActionsTypes.SetAlert),
    debounceTime(4000),
    switchMap(() => of(new globalActions.ClearAlert()))
  );

}
