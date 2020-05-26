import { GlobalActions, GlobalActionsTypes } from './global.actions';
import { AccessType } from '../interfaces';

export interface GlobalState {
  alert: string;
  loggedInUserName: string;
  accessType: AccessType;
}

const initialState: GlobalState = {
  alert: '',
  loggedInUserName: '',
  accessType: AccessType.Visitor
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

    default:
      return state;
  }
}
