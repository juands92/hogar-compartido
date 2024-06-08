import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBody, EventResponse } from '../models/general-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  createEvent(event: EventBody): Observable<EventResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/events`;

    return this.http.post<EventResponse>(url, event, {
      headers,
    });
  }

  deleteEvent(id: string): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/events/${id}`;

    return this.http.delete<void>(url, {
      headers,
    });
  }
}
