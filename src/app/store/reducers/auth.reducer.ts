import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: sessionStorage.getItem('token') !== null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated,
  })),
  on(AuthActions.logut, (state) => ({
    ...state,
    isAuthenticated: false,
  }))
);
