export interface AuthBody {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}
