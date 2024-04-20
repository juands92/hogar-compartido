import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface State {
  id: string;
}

export const initialState: State = {
  id: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.update, (state, { id }) => ({
    ...state,
    id,
  }))
);
