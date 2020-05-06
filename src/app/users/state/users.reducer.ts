import { User, AccessType, Purchase } from '../../shared/interfaces';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState {
  selectedUser: User | null;
  usersPurchases: Purchase[];
  error: string;
  loggedInUserName: string;
  accessType: AccessType;
}

const initialState: UsersState = {
  selectedUser: null,
  usersPurchases: [],
  error: '',
  loggedInUserName: '',
  accessType: AccessType.Visitor,
};

export function reducer(state: UsersState = initialState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.SetSelectedUser:
      return {
        ...state,
        selectedUser: action.payload
      };

    case UsersActionTypes.ClearSelectedUser:
      return {
        ...state,
        selectedUser: null
      };

    case UsersActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload,
      };

    case UsersActionTypes.SaveUserSuccess:
      return state;

    case UsersActionTypes.SaveUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.AddNewUserSuccess:
      return state;

    case UsersActionTypes.AddNewUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.DeleteUserSuccess:
      return state;

    case UsersActionTypes.DeleteUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.GetUsersPurchasesSuccess:
      return {
        ...state,
        usersPurchases: action.payload
      };

    case UsersActionTypes.GetUsersPurchasesFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.ClearUsersPurchases:
      return {
        ...state,
        usersPurchases: []
      };

    case UsersActionTypes.SetLoggedInUserName:
      return {
        ...state,
        loggedInUserName: action.payload
      };

    case UsersActionTypes.SetAccessType:
      return {
        ...state,
        accessType: action.payload
      };

    default:
      return state;
  }
}
