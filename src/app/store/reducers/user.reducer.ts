import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  id: string;
}

export const initialState: State = {
  id: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.update, (state, { id }) => ({
    ...state,
    id,
  })),
  on(AuthActions.logout, () => initialState)
);
