import { Component, OnInit } from '@angular/core';
import { HomeForm } from '../../models/Forms';
import * as ProfileSelectors from '../../store/selectors/profile.selectors';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { AppState, ProfileState } from '../../store/state/state';
import { HomeService } from '../../services/home.service';
import { NgForm } from '@angular/forms';
import { HomeBody, ProfileResponse } from '../../models/general-types';
import * as ProfileActions from '../../store/actions/profile.actions';
import { HttpStatusCode } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent implements OnInit {
  public invalidCredentials: boolean;
  public successMessageVisible: boolean = false;
  public errorMessage: string = '';
  isEditable: boolean = false;
  homeId?: string = '';
  userId: string = '';
  HomeModel = new HomeForm();

  constructor(
    private store: Store<AppState>,
    private _homeService: HomeService,
    private _userService: UserService
  ) {
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        this.HomeModel = {
          name: profile.home?.name,
          address: profile.home?.address,
        };
        this.homeId = profile.home?.id;
        this.isEditable = !this.homeId;
      });

    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  saveHome(f: NgForm): void {
    if (!f.valid) return;

    this._homeService
      .saveHome(this.homeId, this.userId, f.form.value as HomeBody)
      .subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: this.handleError.bind(this),
      });
  }

  private handleSuccess() {
    this.successMessageVisible = true;
    this.isEditable = false;
    this.updateProfileState();
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 4000);
  }

  private updateProfileState() {
    this._userService.getUser(this.userId).subscribe({
      next: (response: ProfileResponse) => {
        this.store.dispatch(
          ProfileActions.updateHome({
            home: response.home,
          })
        );
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
