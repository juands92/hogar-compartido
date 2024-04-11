import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ isAuthenticated: boolean }>()
);

export const logut = createAction('[Auth] Logout');
