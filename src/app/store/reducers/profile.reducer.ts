import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import { HomeResponse } from '../../models/general-types';

export interface State {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  profileImage?: string;
  home?: HomeResponse;
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
    (state, { name, lastName, email, dateOfBirth, profileImage, home }) => ({
      ...state,
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(profileImage && { profileImage }),
      ...(home && { home }),
    })
  )
);
