import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  HomeBody,
  HomeResponse,
  ProfileResponse,
} from '../models/general-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _http: HttpClient) {}

  public saveHome(
    id: string | undefined,
    userId: string,
    body: HomeBody
  ): Observable<HomeResponse | ProfileResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    if (id) {
      const url = `${environment.BASE_URL}/homes/${id}`;
      return this._http.put<HomeResponse>(url, body, { headers });
    } else {
      const url = `${environment.BASE_URL}/homes`;
      return this._http.post<HomeResponse>(url, body, { headers }).pipe(
        switchMap((response: HomeResponse) => {
          if (!response || !response.id) {
            return throwError(() => new Error('Invalid response ID'));
          }
          const updateUserUrl = `${environment.BASE_URL}/users/${userId}`;
          const updateBody = {
            home: { id: response.id },
          };
          return this._http.put<ProfileResponse>(updateUserUrl, updateBody, {
            headers,
          });
        })
      );
    }
  }

  public getHomes(): Observable<HomeResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/homes`;
    return this._http.get<HomeResponse[]>(url, { headers });
  }

  public assignHomeToUser(
    userId: string,
    homeId: string
  ): Observable<ProfileResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const updateUserUrl = `${environment.BASE_URL}/users/${userId}`;
    const updateBody = {
      home: { id: homeId },
    };
    return this._http.put<ProfileResponse>(updateUserUrl, updateBody, {
      headers,
    });
  }
}
