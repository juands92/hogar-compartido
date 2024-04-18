export interface AuthState {
  isAuthenticated: boolean;
}

export interface UserState {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  id: string;
  profileImage?: string;
}

export interface AppState {
  auth: AuthState;
  user: UserState;
}

export const initialAuthState: AppState = {
  auth: {
    isAuthenticated: false,
  },
  user: {
    name: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    id: '',
  },
};
