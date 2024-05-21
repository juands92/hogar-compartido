import { createAction, props } from '@ngrx/store';
import { HomeResponse, TasksResponse } from '../../models/general-types';

export const update = createAction(
  '[Profile] Update',
  props<{
    name?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    profileImage?: string;
    home?: HomeResponse;
    tasks?: TasksResponse;
  }>()
);

export const updateHome = createAction(
  '[Profile] Update Home',
  props<{
    home?: HomeResponse;
  }>()
);

export const updateTasks = createAction(
  '[Profile] Update Tasks',
  props<{
    tasks?: TasksResponse;
  }>()
);
