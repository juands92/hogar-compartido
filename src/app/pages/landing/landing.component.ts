import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state/auth.state';
import * as AuthSelectors from '../../store/selectors/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [],
})
export class LandingComponent implements OnInit {
  isAuthenticated$?: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated
    );
  }
}
