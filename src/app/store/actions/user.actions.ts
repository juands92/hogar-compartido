import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[User] Update',
  props<{
    name: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    id: string;
    profileImage?: string;
  }>()
);
