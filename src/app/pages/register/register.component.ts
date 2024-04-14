import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import * as AuthActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { RegisterForm } from '../../models/Forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Response, RegisterBody } from '../../models/general-types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [],
})
export class RegisterComponent {
  public invalidCredentials: boolean;

  RegisterModel = new RegisterForm();

  constructor(
    private store: Store,
    private router: Router,
    private _authService: AuthenticationService
  ) {
    this.invalidCredentials = false;
  }

  register(f: NgForm): void {
    this._authService.register(f.form.value as RegisterBody).subscribe({
      next: (response: Response) => {
        sessionStorage.setItem('token', response.token);
        this.store.dispatch(AuthActions.login({ isAuthenticated: true }));
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
