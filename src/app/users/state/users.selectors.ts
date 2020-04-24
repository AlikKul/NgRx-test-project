import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getSelectedUser = createSelector(
  getUsersFeatureState,
  state => state.selectedUser
);

export const getError = createSelector(
  getUsersFeatureState,
  state => state.error
);

export const getAccessType = createSelector(
  getUsersFeatureState,
  state => state.accessType
);

export const getLoggedinUserName = createSelector(
  getUsersFeatureState,
  state => state.loggedInUserName
);
