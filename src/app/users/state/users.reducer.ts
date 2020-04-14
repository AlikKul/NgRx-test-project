import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User, AccessType } from '../../shared/interfaces';
import { UsersActions, UsersActionTypes } from './users.actions';

export interface UsersState extends EntityState<User> {
  currentUserId: string;
  error: string;
  loggenInUserEmail: string;
  accessType: AccessType;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = adapter.getInitialState({
  showUsername: true,
  currentUserId: '',
  error: '',
  loggenInUserEmail: '',
  accessType: AccessType.Visitor
});

export function reducer(state: UsersState = initialState, action: UsersActions): UsersState {
  switch (action.type) {

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
      return adapter.addMany(action.payload, {
        ...state,
        accessType: action.payload.find(user => user.email.toLocaleLowerCase() === localStorage.getItem('loggedInUserEmail')).accessType
      });

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

    case UsersActionTypes.SetLoggenInUserEmail:
      return {
        ...state,
        loggenInUserEmail: action.payload
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
