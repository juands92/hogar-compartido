import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[User] Update',
  props<{
    id: string;
  }>()
);
