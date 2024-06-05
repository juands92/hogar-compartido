import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import {
  ExpensesResponse,
  HomeResponse,
  TasksResponse,
} from '../../models/general-types';
import * as AuthActions from '../actions/auth.actions';

export interface State {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  profileImage?: string;
  home?: HomeResponse;
  tasks?: number[];
  expenses?: number[];
}

export const initialState: State = {
  name: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
};

export const profileReducer = createReducer(
  initialState,
  on(
    ProfileActions.update,
    (
      state,
      {
        name,
        lastName,
        email,
        dateOfBirth,
        profileImage,
        home,
        tasks,
        expenses,
      }
    ) => ({
      ...state,
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(profileImage && { profileImage }),
      ...(home && { home }),
      ...(tasks && { tasks }),
      ...(expenses && { expenses }),
    })
  ),
  on(ProfileActions.updateHome, (state, { home }) => ({
    ...state,
    ...(home && { home }),
  })),
  on(ProfileActions.updateTasks, (state, { tasks }) => ({
    ...state,
    ...(tasks && { tasks }),
  })),
  on(ProfileActions.updateExpenses, (state, { expenses }) => ({
    ...state,
    ...(expenses && { expenses }),
  })),
  on(AuthActions.logout, () => initialState)
);
