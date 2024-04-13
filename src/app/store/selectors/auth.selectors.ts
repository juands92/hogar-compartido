import { createSelector } from '@ngrx/store';
import { AppState } from '../state/auth.state';

export const selectAuthState = (state: AppState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
