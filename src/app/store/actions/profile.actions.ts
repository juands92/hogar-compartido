import { createAction, props } from '@ngrx/store';
import { HomeResponse } from '../../models/general-types';

export const update = createAction(
  '[Profile] Update',
  props<{
    name?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    profileImage?: string;
    home?: HomeResponse;
  }>()
);

export const updateHome = createAction(
  '[Profile] Update Home',
  props<{
    home?: HomeResponse;
  }>()
);
