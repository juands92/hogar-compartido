export class LoginForm {
  public email?: string;
  public password?: string;
}

export class UserForm {
  public name?: string;
  public lastName?: string;
  public email?: string;
  public dateOfBirth?: string;
}

export class RegisterForm extends UserForm {
  public password?: string;
  public termsAccepted?: boolean;
}
