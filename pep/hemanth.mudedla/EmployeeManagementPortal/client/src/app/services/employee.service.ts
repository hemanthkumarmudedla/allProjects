import { HttpClient, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  target: string = 'Employees/';

  constructor(private _http: HttpClient) { }

  createEmployee(employee: any): Observable<HttpResponseBase> {
    return this._http.post(`${api.route}${this.target}`, employee, { observe: 'response' });
  }
  getEmployee(id: any): Observable<HttpResponseBase> {
    return this._http.get(`${api.route}${this.target}${id}`, { observe: 'response' });
  }
  updateEmployee(id: any, employee: any): Observable<HttpResponseBase> {
    return this._http.put(`${api.route}${this.target}${id}`, employee, { observe: 'response' });
  }
  deleteEmployee(id: any): Observable<HttpResponseBase> {
    return this._http.delete(`${api.route}${this.target}${id}`, { observe: 'response' });
  }
  loadEmployees(): Observable<HttpResponseBase> {
    return this._http.get(`${api.route}${this.target}`, { observe: 'response' });
  }
}
