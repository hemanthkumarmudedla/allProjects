import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { IdStorageService } from 'src/app/services/id-storage.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService,
    private _tokenStorageService: TokenStorageService,
    private _router: Router, private _toastrService: ToastrService, private _idStorageService: IdStorageService) { }

  ngOnInit(): void {
    this.login();
  }
  loginForm = this._formBuilder.group({
    username: [''],
    password: [''],
  })

  login() {
    var login = this._tokenStorageService.validateToken();
    if (login == true) {
      this._router.navigate(['/home']);
    }
  }

  submit() {
    this._authService.postAuthDetails(this.loginForm.value).subscribe(response => {
      const id = this.loginForm.controls['username'].value;
      this._idStorageService.saveId(id);
      const token = response.body;
      this._tokenStorageService.saveToken(token);
      this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });

      setTimeout(() => {
        this.loginForm.reset();
        this.login();
      }, 2000);
    }, (error) => {
      this._toastrService.error(error.error, 'Error', { timeOut: 2000, });
    });
  }

  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }
}
