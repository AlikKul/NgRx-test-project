import { User, AccessType, Purchase } from '../../shared/interfaces';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  usersPurchases: Purchase[];
  numberOfUsersToDisplay: number;
  error: string;
  loggedInUserName: string;
  accessType: AccessType;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  usersPurchases: [],
  numberOfUsersToDisplay: 10,
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

    case UsersActionTypes.GetUsersSuccess:
      return {
        ...state,
        users: action.payload,
      };

    case UsersActionTypes.GetUsersFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.UpdateUserSuccess:
      return state;

    case UsersActionTypes.UpdateUserFail:
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

    case UsersActionTypes.ClearUsers:
      return {
        ...state,
        users: []
      };

    case UsersActionTypes.SetNumberOfUsersToDisplay:
      return {
        ...state,
        numberOfUsersToDisplay: action.payload
      }

    case UsersActionTypes.DeleteUserSuccess:
      return state;

    case UsersActionTypes.DeleteUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.AddPurchaseSuccess:
      return state;

    case UsersActionTypes.AddPurchaseFail:
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
