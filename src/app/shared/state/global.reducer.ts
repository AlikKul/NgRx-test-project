import { GlobalActions, GlobalActionsTypes } from './global.actions';

export interface GlobalState {
  alert: string;
}

const initialState: GlobalState = {
  alert: ''
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

    default:
      return state;
  }
}
