import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import * as AuthActions from '../../store/actions/auth.actions';
import * as UserActions from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { LoginForm } from '../../models/Forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthBody, Response } from '../../models/general-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent {
  public invalidCredentials: boolean;

  // Modelo de registro utilizado para la vinculación, two-way binding, con el formulario
  LoginModel = new LoginForm();

  constructor(
    private store: Store,
    private router: Router,
    private _authService: AuthenticationService
  ) {
    this.invalidCredentials = false;
  }

  // Al intentar iniciar sesión, se muestra una alerta indicando que el usuario debe registrarse primero.
  login(f: NgForm): void {
    this._authService.login(f.form.value as AuthBody).subscribe({
      next: (response: Response) => {
        console.log('response:', response);
        sessionStorage.setItem('token', response.token);
        this.store.dispatch(AuthActions.login({ isAuthenticated: true }));
        this.store.dispatch(
          UserActions.update({
            name: response.name,
            lastName: response.lastName,
            email: response.email,
            dateOfBirth: response.dateOfBirth,
            id: response.id,
            profileImage: response.profileImage,
          })
        );
        this.router.navigate(['/overview']);
      },
      error: (error) => {
        console.log('Error ' + JSON.stringify(error));
        if (error.status === HttpStatusCode.Unauthorized) {
          this.invalidCredentials = true;
        }
      },
    });
  }
}
