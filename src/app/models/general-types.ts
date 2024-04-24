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
  profileImage: string;
}

export interface HomeBody {
  name: string;
  address: string;
}

export interface AuthResponse {
  id: string;
  token: string;
}

export interface ProfileResponse {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  profileImage?: string;
  home?: HomeResponse;
}

export interface HomeResponse {
  id: string;
  name: string;
  address: string;
  users: string[];
  expenses: string[];
  events: string[];
}
