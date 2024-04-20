import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBody, ProfileResponse } from '../../models/general-types';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { AppState } from '../../store/state/state';
import { UserService } from '../../services/user.service';
import * as ProfileActions from '../../store/actions/profile.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [],
})
export class OverviewComponent implements OnInit {
  user$?: Observable<UserBody>;
  userId: string = '';

  constructor(
    private _userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });

    if (this.userId) {
      this._userService.getUser(this.userId).subscribe({
        next: (response: ProfileResponse) => {
          this.store.dispatch(
            ProfileActions.update({
              name: response.name,
              lastName: response.lastName,
              email: response.email,
              dateOfBirth: response.dateOfBirth,
              profileImage: response.profileImage,
              home: response.home,
            })
          );
        },
        error: (error) => {
          console.log('Error ' + JSON.stringify(error));
        },
      });
    }
  }
}
