import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdStorageService } from 'src/app/services/id-storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userData: any;

  constructor(private _tokenStorageService: TokenStorageService, private _router: Router,
    private _toastrService: ToastrService, private _idStorageService: IdStorageService) { }

  logout() {
    this._idStorageService.signOut();
    this._tokenStorageService.signOut();
    var login = this._tokenStorageService.validateToken();
    if (login == false) {
      this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 2000);
    }
  }
}
