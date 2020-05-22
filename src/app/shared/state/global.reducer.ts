import { GlobalActions, GlobalActionsTypes } from './global.actions';
import { AccessType } from '../interfaces';

export interface GlobalState {
  alert: string;
  loggedInUserName: string;
  accessType: AccessType;
  showLoader: boolean;
}

const initialState: GlobalState = {
  alert: '',
  loggedInUserName: '',
  accessType: AccessType.Visitor,
  showLoader: false
};

export function reducer(state: GlobalState = initialState, action: GlobalActions): GlobalState {
  switch (action.type) {

    case GlobalActionsTypes.SetAlert:
      return {
        ...state,
        alert: action.payload
      };

    case GlobalActionsTypes.ClearAlert:
      return {
        ...state,
        alert: ''
      };

    case GlobalActionsTypes.SetLoggedInUserName:
      return {
        ...state,
        loggedInUserName: action.payload
      };

    case GlobalActionsTypes.SetAccessType:
      return {
        ...state,
        accessType: action.payload
      };

    case GlobalActionsTypes.SetShowLoader:
      return {
        ...state,
        showLoader: action.payload
      };

    default:
      return state;
  }
}
