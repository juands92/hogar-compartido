import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppState } from '../../store/state/state';
import * as AuthActions from '../../store/actions/auth.actions';
import * as AuthSelectors from '../../store/selectors/auth.selectors';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  isAuthenticated$?: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch(AuthActions.logut());
    this.router.navigate(['/landing']);
  }
}
