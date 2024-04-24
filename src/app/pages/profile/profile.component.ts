import { Component, OnInit } from '@angular/core';
import { UserForm } from '../../models/Forms';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { ProfileResponse, UserBody } from '../../models/general-types';
import { HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState, ProfileState } from '../../store/state/state';
import * as ProfileSelectors from '../../store/selectors/profile.selectors';
import * as UserSelectors from '../../store/selectors/user.selectors';

import * as ProfileActions from '../../store/actions/profile.actions';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { format, parse } from 'date-fns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [],
})
export class ProfileComponent implements OnInit {
  public invalidCredentials: boolean;
  public successMessageVisible: boolean = false;

  faUpload = faUpload;

  UserModel = new UserForm();
  imageSrc: string | ArrayBuffer | null = '';
  userId: string = '';
  userName: string = '';

  isEditable = false;

  constructor(
    private store: Store<AppState>,
    private _userService: UserService
  ) {
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        this.UserModel = {
          name: profile.name,
          lastName: profile.lastName,
          email: profile.email,
          dateOfBirth: format(
            parse(profile.dateOfBirth, 'dd/MM/yyyy', new Date()),
            'yyyy-MM-dd'
          ),
          homeName: profile.home?.name,
        };

        this.userName = profile.name;
        profile.profileImage
          ? (this.imageSrc = 'data:image/jpeg;base64,' + profile.profileImage)
          : (this.imageSrc =
              'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg');
      });

    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;
    });
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

  updateUser(f: NgForm, fileInput: any): void {
    if (!f.valid) return;

    this._userService
      .updateUser(this.userId, f.form.value as UserBody)
      .subscribe({
        next: (response: ProfileResponse) => {
          this.handleSuccess(response);
          const file = fileInput.files?.item(0) || null;
          if (file) this.updateUserImage(file);
        },
        error: this.handleError.bind(this),
      });
  }

  updateUserImage(fileInput: File): void {
    this._userService.updateUserImage(this.userId, fileInput).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(response: ProfileResponse) {
    this.store.dispatch(
      ProfileActions.update({
        ...response,
      })
    );
    this.successMessageVisible = true;
    this.isEditable = false;
    setTimeout(() => {
      this.successMessageVisible = false;
    }, 4000);
  }

  private handleError(error: { status: HttpStatusCode }) {
    console.log('Error ' + JSON.stringify(error));
    this.successMessageVisible = false;
    if (error.status === HttpStatusCode.Unauthorized) {
      this.invalidCredentials = true;
    }
  }
}
