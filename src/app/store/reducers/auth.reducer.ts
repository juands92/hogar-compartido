// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated,
  })),
  on(AuthActions.logout, () => initialState)
);
