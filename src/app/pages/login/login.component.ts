import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import * as AuthActions from '../../store/actions/auth.actions';
import * as UserActions from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { LoginForm } from '../../models/Forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthBody, AuthResponse } from '../../models/general-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent {
  public invalidCredentials: boolean;
  public errorMessage: string = '';

  LoginModel = new LoginForm();

  constructor(
    private store: Store,
    private router: Router,
    private _authService: AuthenticationService
  ) {
    this.invalidCredentials = false;
  }

  login(f: NgForm): void {
    this._authService.login(f.form.value as AuthBody).subscribe({
      next: (response: AuthResponse) => {
        sessionStorage.setItem('token', response.token);
        this.store.dispatch(AuthActions.login({ isAuthenticated: true }));
        this.store.dispatch(
          UserActions.update({
            id: response.id,
          })
        );
        this.router.navigate(['/overview']);
      },
      error: this.handleError.bind(this),
    });
  }

  private handleError(error: { status: HttpStatusCode; error: string }) {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.invalidCredentials = true;
    }

    this.errorMessage = '!Algo ha salido mal!';
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }
}
