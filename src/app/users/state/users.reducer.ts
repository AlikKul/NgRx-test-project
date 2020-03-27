import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState {
  showUsername: boolean;
  currentUserId: string;
  users: User[];
  error: string;
}

const initialState: UsersState = {
  showUsername: true,
  currentUserId: '',
  users: [],
  error: ''
};

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getShowUsername = createSelector(
  getUsersFeatureState,
  state => state.showUsername
);

export const getCurrentUserId = createSelector(
  getUsersFeatureState,
  state => state.currentUserId
);

export const getAllUsers = createSelector(
  getUsersFeatureState,
  state => state.users
);

export const getCurrentUser = createSelector(
  getAllUsers,
  getCurrentUserId,
  (users, id) => {
    if (users.find(user => user.id === id)) {
      return users.find(user => user.id === id);
    }
    return {
      id: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: ''
    };
  }
);

export const getError = createSelector(
  getUsersFeatureState,
  state => state.error
);

export function reducer(state: UsersState = initialState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.ToggleUsername:
      return {
        ...state,
        showUsername: action.payload
      };

    case UsersActionTypes.SetCurrentUserId:
      return {
        ...state,
        currentUserId: action.payload
      };

    case UsersActionTypes.ClearCurrentUserId:
      return {
        ...state,
        currentUserId: ''
      };

    case UsersActionTypes.LoadSuccess:
      return {
        ...state,
        users: action.payload,
        error: ''
      };

    case UsersActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload,
        users: []
      };

    case UsersActionTypes.SaveUserSuccess:
      let updatedUsers: User[];
      if (!state.users.find(user => user.id === action.payload.id)) {
        updatedUsers = [...state.users, action.payload];
      } else {
        updatedUsers = state.users.map(
          user => action.payload.id === user.id ? action.payload : user
        );
      }
      return {
        ...state,
        users: updatedUsers,
        currentUserId: '',
      };

    case UsersActionTypes.SaveUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.AddNewUserSuccess:
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUserId: ''
      };

    case UsersActionTypes.AddNewUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.DeleteUser:
      const filteredUsers = state.users.filter(
        user => user.id !== action.payload
      );
      return {
        ...state,
        users: filteredUsers,
        currentUserId: ''
      };

    default:
      return state;
  }
}
