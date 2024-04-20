import { HomeResponse } from '../../models/general-types';

export interface AuthState {
  isAuthenticated: boolean;
}

export interface ProfileState {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  id: string;
  profileImage?: string;
  home?: HomeResponse;
}

export interface UserState {
  id: string;
}

export interface AppState {
  auth: AuthState;
  user: UserState;
  profile: ProfileState;
}
