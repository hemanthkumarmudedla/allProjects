import { Injectable } from '@angular/core';

const ID_KEY = 'id';

@Injectable({
  providedIn: 'root'
})
export class IdStorageService {

  constructor() { }

  signOut(): void {
    window.localStorage.removeItem(ID_KEY);
  }
  public saveId(id: string): void {
    window.localStorage.removeItem(ID_KEY);
    window.localStorage.setItem(ID_KEY, id);
  }
  public getId(): any {
    return window.localStorage.getItem(ID_KEY);
  }
}
