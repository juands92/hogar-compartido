import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, UserBody } from '../models/general-types';
import { environment } from '../../environments/environment';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public updateUser(body: UserBody): Observable<Response> {
    let url = `${environment.BASE_URL}/users/752`;

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

    return this._http.put<Response>(url, formattedBody, { headers });
  }
}
