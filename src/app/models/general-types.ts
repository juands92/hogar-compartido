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

export interface TaskBody {
  description: string;
  dateCreated: string;
  status: number;
  home: { id: string };
  user: { id: string };
}

export interface ExpenseBody {
  description: string;
  dateCreated: string;
  amount: number;
  home: { id: string };
  user: { id: string };
}

export interface AuthResponse {
  id: string;
  token: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  profileImage?: string;
  home?: HomeResponse;
  tasks?: number[];
  expenses?: number[];
}

export interface HomeResponse {
  id: string;
  name: string;
  address: string;
  users: string[] | ProfileResponse[];
  expenses: ExpensesResponse[];
  events: string[];
  tasks: TasksResponse[];
}

export interface TasksResponse {
  id: number;
  dateCreated: string;
  description: string;
  status: number;
  home: { id: string };
  user: { id: string };
}

export interface ExpensesResponse {
  id: number;
  description: string;
  amount: number;
  dateCreated: string;
  user: { id: string };
  home: { id: string };
}

export interface HomeUser {
  id: string;
  name: string;
  lastName: string;
  profileImage: string;
  expenses?: ExpensesResponse[];
  tasks?: TasksResponse[];
}
