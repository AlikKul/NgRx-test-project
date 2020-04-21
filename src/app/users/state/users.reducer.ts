import { User, AccessType } from '../../shared/interfaces';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState {
  editUser: User | null;
  error: string;
  loggedInUserName: string;
  accessType: AccessType;
}

const initialState: UsersState = {
  editUser: null,
  error: '',
  loggedInUserName: '',
  accessType: AccessType.Visitor,
};

export function reducer(state: UsersState = initialState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.SetEditUser:
      return {
        ...state,
        editUser: action.payload
      };

    case UsersActionTypes.ClearEditUser:
      return {
        ...state,
        editUser: null
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
