import { Component, OnInit } from '@angular/core';
import { UserForm } from '../../models/Forms';
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service'; // Importar HomeService
import { NgForm } from '@angular/forms';
import {
  ProfileResponse,
  UserBody,
  HomeResponse,
  HomeBody,
} from '../../models/general-types';
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
  public errorMessage: string = '';

  faUpload = faUpload;

  UserModel = new UserForm();
  imageSrc: string | ArrayBuffer | null = '';
  userId: string = '';
  userName: string = '';
  homes: HomeResponse[] = [];
  homeId: string = '';

  isEditable = false;
  isHomeSelected = false;

  constructor(
    private store: Store<AppState>,
    private _userService: UserService,
    private _homeService: HomeService
  ) {
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.store.select(UserSelectors.selectUserId).subscribe((id) => {
      this.userId = id;

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
                tasks: response.tasks,
                expenses: response.expenses,
              })
            );

            this.UserModel = {
              name: response.name,
              lastName: response.lastName,
              email: response.email,
              dateOfBirth: format(
                parse(response.dateOfBirth, 'dd/MM/yyyy', new Date()),
                'yyyy-MM-dd'
              ),
              homeName: response.home?.name,
            };

            this.userName = response.name;
            response.profileImage
              ? (this.imageSrc =
                  'data:image/jpeg;base64,' + response.profileImage)
              : (this.imageSrc =
                  'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg');
          },
          error: (error) => {
            console.log('Error ' + JSON.stringify(error));
          },
        });
      }
    });
    this._homeService.getHomes().subscribe((homes: HomeResponse[]) => {
      this.homes = homes;
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

  async updateUser(f: NgForm, fileInput: any): Promise<void> {
    if (!this.isEditable && !this.isHomeSelected) return;

    if (this.homeId) {
      this._homeService.assignHomeToUser(this.userId, this.homeId).subscribe({
        next: () => {
          this.updateProfileHomeState();
        },
        error: this.handleError.bind(this),
      });
    }

    if (f.valid) {
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
  }

  updateUserImage(fileInput: File): void {
    this._userService.updateUserImage(this.userId, fileInput).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  assignHome(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value) {
      this.homeId = selectElement.value;
      this.isHomeSelected = true;
    } else {
      this.isHomeSelected = false;
    }
  }

  private updateProfileHomeState() {
    this._userService.getUser(this.userId).subscribe({
      next: (response: ProfileResponse) => {
        this.store.dispatch(
          ProfileActions.updateHome({
            home: response.home,
          })
        );

        this.UserModel = {
          ...this.UserModel,
          homeName: response.home?.name,
        };

        this.successMessageVisible = true;
        setTimeout(() => {
          this.successMessageVisible = false;
        }, 4000);
      },
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
