import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { AccessType } from '../../shared/interfaces';

const getUsersFeatureState = createFeatureSelector<UsersState>('users');

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
      website: '',
      accessType: AccessType.Visitor
    };
  }
);

export const getError = createSelector(
  getUsersFeatureState,
  state => state.error
);

export const getAccessType = createSelector(
  getUsersFeatureState,
  state => state.accessType
);

export const getLoggedinUserEmail = createSelector(
  getUsersFeatureState,
  state => state.loggenInUserEmail
);
