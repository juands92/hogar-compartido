import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';
import {
  ProfileResponse,
  TaskBody,
  TasksResponse,
} from '../models/general-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private _http: HttpClient) {}

  public saveTask(task: TaskBody): Observable<TasksResponse> {
    const { dateCreated } = task;
    const formattedTask = {
      ...task,
      dateCreated: moment(dateCreated).format('DD/MM/YYYY'),
    };

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/tasks`;

    return this._http.post<TasksResponse>(url, formattedTask, { headers });
  }

  public updateTask(id: number, task: TaskBody): Observable<TasksResponse> {
    const { dateCreated, user } = task;
    const formattedTask = {
      ...task,
      dateCreated: moment(dateCreated).format('DD/MM/YYYY'),
      user: typeof user === 'string' ? { id: user } : user,
    };

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/tasks/${id}`;

    return this._http.put<TasksResponse>(url, formattedTask, { headers });
  }

  public deleteTask(id: number): Observable<TasksResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/tasks/${id}`;
    console.log('url:', url);
    return this._http.delete<TasksResponse>(url, { headers });
  }
}
