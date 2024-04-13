import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthBody,
  AuthenticationResponse,
  RegisterBody,
} from '../models/general-types';
import { environment } from '../../environments/environment';
import moment from 'moment';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private _http: HttpClient) {}

  public login(body: AuthBody): Observable<AuthenticationResponse> {
    let url = `${environment.BASE_URL}/auth/login`;

    return this._http.post<AuthenticationResponse>(url, body);
  }

  public register(body: RegisterBody): Observable<AuthenticationResponse> {
    let url = `${environment.BASE_URL}/auth/register`;

    const { dateOfBirth } = body;

    const formattedBody = {
      ...body,
      dateOfBirth: moment(dateOfBirth).format('DD/MM/YYYY'),
    };

    return this._http.post<AuthenticationResponse>(url, formattedBody);
  }

}
