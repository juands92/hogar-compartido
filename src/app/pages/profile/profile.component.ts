import { Component, OnInit } from '@angular/core';
import { UserForm } from '../../models/Forms';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Response, UserBody } from '../../models/general-types';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [],
})
export class ProfileComponent implements OnInit {
  public invalidCredentials: boolean;

  UserModel = new UserForm();

  isEditable = false;

  constructor(private _userService: UserService) {
    this.invalidCredentials = false;
  }

  ngOnInit(): void {
    this.UserModel = {
      name: 'Pedro',
      lastName: 'Martínez',
      email: 'test@test.com',
      dateOfBirth: '1980-01-01',
    };
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  updateUser(f: NgForm): void {
    this._userService.updateUser(f.form.value as UserBody).subscribe({
      next: (response: Response) => {
        console.log('Response ', response);
      },
      error: (error) => {
        console.log('Error ' + JSON.stringify(error));
        if (error.status === HttpStatusCode.Unauthorized) {
          this.invalidCredentials = true;
        }
      },
    });
  }
}
