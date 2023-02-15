import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _msalService: MsalService) { }
  
  getName(): string {
    const account = this._msalService.instance.getActiveAccount();
    let name:string = '';
    if (account != null)
      if (account.name != undefined)
        name = account.name;
    return name;
  }

  getEmail(): string {
    const account = this._msalService.instance.getActiveAccount();
    let username: string = '';
    if (account != null)
      if (account.username != undefined)
        username = account.username;
    return username;
  }
}
