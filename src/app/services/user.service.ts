import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExpensesResponse,
  ProfileResponse,
  UserBody,
} from '../models/general-types';
import { environment } from '../../environments/environment';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public getUser(id: string): Observable<ProfileResponse> {
    let url = `${environment.BASE_URL}/users/${id}`;

    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._http.get<ProfileResponse>(url, { headers });
  }

  public updateUser(id: string, body: UserBody): Observable<ProfileResponse> {
    let url = `${environment.BASE_URL}/users/${id}`;

    const token = sessionStorage.getItem('token');

    const { dateOfBirth } = body;

    const formattedBody = {
      ...body,
      dateOfBirth: moment(dateOfBirth).format('DD/MM/YYYY'),
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this._http.put<ProfileResponse>(url, formattedBody, { headers });
  }

  public updateUserImage(
    id: string,
    imageFile: File
  ): Observable<ProfileResponse> {
    let url = `${environment.BASE_URL}/users/${id}/image`;

    const token = sessionStorage.getItem('token');

    const formData = new FormData();
    formData.append('image', imageFile);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._http.put<ProfileResponse>(url, formData, {
      headers,
    });
  }
}
