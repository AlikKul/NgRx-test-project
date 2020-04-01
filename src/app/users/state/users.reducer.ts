import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../user';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState extends EntityState<User> {
  showUsername: boolean;
  currentUserId: string;
  error: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = adapter.getInitialState({
  showUsername: true,
  currentUserId: '',
  error: ''
});

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
      return adapter.addMany(action.payload, state);

    case UsersActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload,
      };

    case UsersActionTypes.SaveUserSuccess:
      return adapter.upsertOne(action.payload, {...state, currentUserId: ''});

    case UsersActionTypes.SaveUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.AddNewUserSuccess:
      return adapter.addOne(action.payload, {...state, currentUserId: ''});

    case UsersActionTypes.AddNewUserFail:
      return {
        ...state,
        error: action.payload
      };

    case UsersActionTypes.DeleteUserSuccess:
      return adapter.removeOne(action.payload, {...state, currentUserId: ''});

    case UsersActionTypes.DeleteUserFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
