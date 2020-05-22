import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GlobalState } from './global.reducer';
import * as globalSelectors from './global.selectors';
import * as globalActions from './global.actions';
import { AccessType } from '../interfaces';

@Injectable({providedIn: 'root'})
export class GlobalFacade {

  alert$: Observable<string>;
  accessType$: Observable<AccessType>;
  loggedInUserName$: Observable<string>;
  showLoader$: Observable<boolean>;

  constructor(
    private store: Store<GlobalState>
  ) {
    this.alert$ = this.store.pipe(select(globalSelectors.getAlert));
    this.accessType$ = this.store.pipe(select(globalSelectors.getAccessType));
    this.loggedInUserName$ = store.pipe(select(globalSelectors.getLoggedInUserName));
    this.showLoader$ = this.store.pipe(select(globalSelectors.getShowLoader));
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
  setShowLoader(value: boolean) {
    this.store.dispatch(new globalActions.SetShowLoader(value));
  }

}
