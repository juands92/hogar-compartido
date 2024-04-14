import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../state/user.state";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserDetails = createSelector(
  selectUserState,
  state => state.userDetails
);

export const selectUserId = createSelector(
  selectUserState,
  state => state.userDetails?.id
);