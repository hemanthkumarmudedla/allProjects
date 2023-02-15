import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): any {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public validateToken(): boolean {
    var token = this.getToken();
    if (token != null) {
      return true;
    }
    else {
      return false;
    }
  }
}


