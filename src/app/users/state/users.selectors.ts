import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

export const getEditUser = createSelector(
  getUsersFeatureState,
  state => state.editUser
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
