import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs';
import { User } from '../models/user';
import { selectUserDetails } from '../store/selectors/user.selectors';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = `${environment.BASE_URL}/users`;

  constructor(private http: HttpClient, private store: Store<any>) { }

  getUserProfileDetails(): Observable<User> {
    return this.store.select(selectUserDetails).pipe(
      switchMap(userId => {
        if (!userId) {
          return of(null);
        }
        const url = `${this.baseUrl}/${userId}`;
        return this.http.get<User>(url).pipe(
          catchError(error => {
            console.error('Error fetching user profile', error);
            return of(null);
          })
        );
      })
    );
  }
}
