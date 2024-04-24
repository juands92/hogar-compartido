import { Component, OnInit } from '@angular/core';
import * as AuthActions from '../../store/actions/auth.actions';
import { AppState, ProfileState } from '../../store/state/state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProfileSelectors from '../../store/selectors/profile.selectors';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements OnInit {
  userName: string = '';
  lastName: string = '';
  imageSrc: string | ArrayBuffer | null = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(ProfileSelectors.selectProfile)
      .subscribe((profile: ProfileState) => {
        this.userName = profile.name;
        this.lastName = profile.lastName;

        profile.profileImage
          ? (this.imageSrc = 'data:image/jpeg;base64,' + profile.profileImage)
          : (this.imageSrc =
              'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg');
      });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/landing']);
  }
}
