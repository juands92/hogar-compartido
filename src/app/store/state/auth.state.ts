export interface AuthState {
  isAuthenticated: boolean;
}

export interface AppState {
  auth: AuthState;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
};
