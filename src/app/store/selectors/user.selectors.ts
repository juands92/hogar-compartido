// auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../state/state';

export const selectUserState = (state: AppState) => state.user;

export const selectUserId = createSelector(
  selectUserState,
  (state) => state.id
);
