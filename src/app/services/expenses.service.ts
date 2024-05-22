import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment';
import { ExpensesResponse, ExpenseBody } from '../models/general-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private _http: HttpClient) {}

  public saveExpense(expense: ExpenseBody): Observable<ExpensesResponse> {
    const { dateCreated } = expense;
    const formattedExpense = {
      ...expense,
      dateCreated: moment(dateCreated).format('DD/MM/YYYY'),
    };

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/expenses`;

    return this._http.post<ExpensesResponse>(url, formattedExpense, {
      headers,
    });
  }

  public updateExpense(
    id: number,
    expense: ExpenseBody
  ): Observable<ExpensesResponse> {
    const { dateCreated, home, user } = expense;
    const formattedExpense = {
      ...expense,
      dateCreated: moment(dateCreated).format('DD/MM/YYYY'),
      home: typeof home === 'string' ? { id: home } : home,
      user: typeof user === 'string' ? { id: user } : user,
    };

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/expenses/${id}`;

    return this._http.put<ExpensesResponse>(url, formattedExpense, { headers });
  }

  public deleteExpense(id: number): Observable<ExpensesResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${environment.BASE_URL}/expenses/${id}`;
    return this._http.delete<ExpensesResponse>(url, { headers });
  }
}
