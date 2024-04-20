// auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../state/state';

export const selectUserState = (state: AppState) => state.profile;

export const selectProfile = createSelector(selectUserState, (state) => state);
