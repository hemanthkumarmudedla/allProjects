import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  target: string = 'Results';

  constructor(private _http: HttpClient) { }

  getUserById(id: any): Observable<HttpResponseBase> {
    return this._http.get(`${api.route}${this.target}/${id}`, { observe: 'response' });
  }
}
