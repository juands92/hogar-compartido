export interface AuthBody {
  email: string;
  password: string;
}

export interface RegisterBody extends UserBody {
  password: string;
  termsAccepted: boolean;
}

export interface UserBody {
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface Response {
  token: string;
  username: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  id: string;
}
