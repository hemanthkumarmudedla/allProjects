import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, map, Observable, of } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [DatePipe]
})
export class RegistrationComponent implements OnInit {

  usersData!: any;
  usernames!: any;
  userRegistrationForm!: FormGroup;
  cities = ['Hyderabad', 'Bangalore', 'Kochi'];

  constructor(private _formBuilder: FormBuilder, private _registrationService: RegistrationService,
    private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.getUsernames();
  }

  createForm() {
    this.userRegistrationForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.maxLength(25)], [this.usernameValidator()]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^.*(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')]],
      location: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }
  getUsernames() {
    this._registrationService.getAllUsernames().subscribe(response => {
      this.usernames = response;
    })
  }
  changeCity(e: any) {
    this.location?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  register() {
    this._registrationService.postUser(this.userRegistrationForm.value).subscribe(response => {
      this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });
      setTimeout(() => {
        this.userRegistrationForm.reset();
        this._router.navigate(['/'])
      }, 2000);
    }, (error) => {
      this._toastrService.error(error.error, 'Error', { timeOut: 2000, });
    });
  }

  checkIfUsernameExists(username: string): Observable<boolean> {
    return of(this.usernames.body.includes(username)).pipe(delay(100));
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(this.userRegistrationForm.controls['username'].value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }


  get firstName() {
    return this.userRegistrationForm.get('firstName')
  }
  get lastName() {
    return this.userRegistrationForm.get('lastName')
  }
  get username() {
    return this.userRegistrationForm.get('username')
  }
  get password() {
    return this.userRegistrationForm.get('password')
  }
  get location() {
    return this.userRegistrationForm.get('location')
  }
  get mobileNo() {
    return this.userRegistrationForm.get('mobileNo')
  }
  get dateOfBirth() {
    return this.userRegistrationForm.get('dateOfBirth')
  }
  get gender() {
    return this.userRegistrationForm.get('gender')
  }
}