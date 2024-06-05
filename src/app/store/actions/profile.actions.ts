import { createAction, props } from '@ngrx/store';
import {
  ExpensesResponse,
  HomeResponse,
  TasksResponse,
} from '../../models/general-types';

export const update = createAction(
  '[Profile] Update',
  props<{
    name?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    profileImage?: string;
    home?: HomeResponse;
    tasks?: number[];
    expenses?: number[];
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
    tasks?: number[];
  }>()
);

export const updateExpenses = createAction(
  '[Profile] Update Expenses',
  props<{
    expenses?: number[];
  }>()
);
