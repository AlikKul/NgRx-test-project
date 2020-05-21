import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GlobalState } from './global.reducer';
import { getAlert, getAccessType, getLoggedInUserName } from './global.selectors';
import * as globalActions from './global.actions';
import { AccessType } from '../interfaces';

@Injectable({providedIn: 'root'})
export class GlobalFacade {

  alert$: Observable<string>;
  accessType$: Observable<AccessType>;
  loggedInUserName$: Observable<string>;

  constructor(
    private store: Store<GlobalState>
  ) {
    this.alert$ = this.store.pipe(select(getAlert));
    this.accessType$ = this.store.pipe(select(getAccessType));
    this.loggedInUserName$ = store.pipe(select(getLoggedInUserName));
  }

  setAlert(message: string) {
    this.store.dispatch(new globalActions.SetAlert(message));
  }

  setAccessType(value) {
    this.store.dispatch(new globalActions.SetAccessType(value));
  }

  setLoggedInUserName(name) {
    this.store.dispatch(new globalActions.SetLoggedInUserName(name));
  }

}
