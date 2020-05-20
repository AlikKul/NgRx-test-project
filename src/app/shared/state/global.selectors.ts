import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GlobalState } from './global.reducer';

const getGlobalFeatureSlice = createFeatureSelector<GlobalState>('global');

export const getAlert = createSelector(
  getGlobalFeatureSlice,
  state => state.alert
);
