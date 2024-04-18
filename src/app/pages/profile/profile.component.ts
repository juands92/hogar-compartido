import { Component, OnInit } from '@angular/core';
import { UserForm } from '../../models/Forms';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Response, UserBody } from '../../models/general-types';
import { HttpStatusCode } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../../store/state/state';
import * as UserSelectors from '../../store/selectors/user.selectors';
import moment from 'moment';
import * as UserActions from '../../store/actions/user.actions';
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
    this.store.select(UserSelectors.selectUser).subscribe((user: UserState) => {
      this.UserModel = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: format(
          parse(user.dateOfBirth, 'dd/MM/yyyy', new Date()),
          'yyyy-MM-dd'
        ),
      };
      this.userId = user.id;
      this.userName = user.name;
      user.profileImage
        ? (this.imageSrc = 'data:image/jpeg;base64,' + user.profileImage)
        : (this.imageSrc =
            'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg');
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
        next: (response: Response) => {
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

  private handleSuccess(response: Response) {
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
    this.successMessageVisible = true;
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
