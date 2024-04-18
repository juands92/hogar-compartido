import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface State {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  id: string;
  profileImage?: string;
}

export const initialState: State = {
  name: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  id: '',
};

export const userReducer = createReducer(
  initialState,
  on(
    UserActions.update,
    (state, { name, lastName, email, dateOfBirth, id, profileImage }) => ({
      ...state,
      name,
      lastName,
      email,
      dateOfBirth,
      id,
      profileImage,
    })
  )
);
