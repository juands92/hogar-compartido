import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../store/selectors/auth.selectors';

import {
  faBell,
  faCalendar,
  faHome,
  faLayerGroup,
  faListCheck,
  faMoneyBill,
  faSolarPanel,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppState } from '../../store/state/state';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-panel-navbar',
  templateUrl: './panel-navbar.component.html',
  styleUrls: ['./panel-navbar.component.css'],
})
export class PanelNavbarComponent implements OnInit {
  faBell = faBell;
  faSolarPanel = faSolarPanel;
  faUserCircle = faUserCircle;
  faCalendar = faCalendar;
  faMoneyBill = faMoneyBill;
  faListCheck = faListCheck;
  faLayerGroup = faLayerGroup;
  faHome = faHome;
  isAuthenticated$?: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated
    );
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/landing']);
  }
}
