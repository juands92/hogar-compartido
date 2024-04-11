import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthBody, AuthenticationResponse } from '../models/general-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _http: HttpClient) {}

  public login(body: AuthBody): Observable<AuthenticationResponse> {
    let url = `${environment.BASE_URL}/auth/login`;

    return this._http.post<AuthenticationResponse>(url, body);
  }
}
