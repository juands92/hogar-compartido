import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBody } from '../../models/general-types';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { AppState } from '../../store/state/state';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [],
})
export class OverviewComponent implements OnInit {
  user$?: Observable<UserBody>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(UserSelectors.selectUser);
  }
}
