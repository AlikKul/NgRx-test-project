import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

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
  state => state.entities
);

export const getCurrentUser = createSelector(
  getAllUsers,
  getCurrentUserId,
  (users, id) => {
    if (users[id]) {
      return users[id];
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
