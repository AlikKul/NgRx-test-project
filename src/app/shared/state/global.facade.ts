import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GlobalState } from './global.reducer';
import { getAlert } from './global.selectors';
import * as globalActions from './global.actions';

@Injectable({providedIn: 'root'})
export class GlobalFacade {

  alert$: Observable<string>;

  constructor(
    private store: Store<GlobalState>
  ) {
    this.alert$ = this.store.pipe(select(getAlert));
  }

  setAlert(message: string) {
    this.store.dispatch(new globalActions.SetAlert(message));
  }

}
