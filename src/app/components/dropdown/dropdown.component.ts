import { Component } from '@angular/core';
import * as AuthActions from '../../store/actions/auth.actions';
import { AppState } from '../../store/state/auth.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  constructor(private store: Store<AppState>, private router: Router) {}

  logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch(AuthActions.logut());
    this.router.navigate(['/landing']);
  }
}
