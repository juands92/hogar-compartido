export interface AuthBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  termsAccepted: boolean;
}

export interface AuthenticationResponse {
  token: string;
  username: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  id: string;
}
