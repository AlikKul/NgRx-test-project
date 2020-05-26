import { User, AccessType, Purchase } from '../../shared/interfaces';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  usersPurchases: Purchase[];
  numberOfUsersToDisplay: number;
  error: string;
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  usersPurchases: [],
  numberOfUsersToDisplay: 10,
  error: '',
  isLoading: false
};

export function reducer(state: UsersState = initialState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.GetUsers:
    case UsersActionTypes.UpdateUser:
    case UsersActionTypes.AddNewUser:
    case UsersActionTypes.DeleteUser:
    case UsersActionTypes.AddPurchase:
    case UsersActionTypes.GetUsersPurchases:
      return {
        ...state,
        isLoading: true
      };

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
        isLoading: false
      };

    case UsersActionTypes.GetUsersFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UsersActionTypes.UpdateUserSuccess:
      return {
        ...state,
        isLoading: false
      };

    case UsersActionTypes.UpdateUserFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UsersActionTypes.AddNewUserSuccess:
      return {
        ...state,
        isLoading: false
      };

    case UsersActionTypes.AddNewUserFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
      };

    case UsersActionTypes.DeleteUserSuccess:
      return {
        ...state,
        isLoading: false
      };

    case UsersActionTypes.DeleteUserFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UsersActionTypes.AddPurchaseSuccess:
      return {
        ...state,
        isLoading: false
      };

    case UsersActionTypes.AddPurchaseFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UsersActionTypes.GetUsersPurchasesSuccess:
      return {
        ...state,
        usersPurchases: action.payload,
        isLoading: false
      };

    case UsersActionTypes.GetUsersPurchasesFail:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UsersActionTypes.ClearUsersPurchases:
      return {
        ...state,
        usersPurchases: []
      };

    default:
      return state;
  }
}
