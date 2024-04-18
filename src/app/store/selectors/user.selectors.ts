// auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../state/state';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(selectUserState, (state) => state);
