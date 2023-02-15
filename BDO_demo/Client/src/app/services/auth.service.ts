import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  target: string = 'Auth';


  constructor(private _http: HttpClient) { }

  postAuthDetails(authDetails: any): Observable<any> {
    return this._http.post(`${api.route}${this.target}`, authDetails, {
      // responseType: 'text',
      observe: 'response'
    });
  }
}
