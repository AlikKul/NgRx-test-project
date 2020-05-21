import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
  getUsersFeatureState,
  state => state.users
);

export const getSelectedUser = createSelector(
  getUsersFeatureState,
  state => state.selectedUser
);

export const getUsersPurchases = createSelector(
  getUsersFeatureState,
  state => state.usersPurchases
);

export const getNumberOfUsersToDisplay = createSelector(
  getUsersFeatureState,
  state => state.numberOfUsersToDisplay
);

export const getError = createSelector(
  getUsersFeatureState,
  state => state.error
);
