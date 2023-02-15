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

  studentData!: any;
  usernames!: any;
  studentRegistrationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _registrationService: RegistrationService,
    private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
    this.getUsernames();
  }

  createForm() {
    this.studentRegistrationForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.maxLength(25)], [this.usernameValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^.*(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')]],
      mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      dateOfBirth: ['', [Validators.required]],
    });
  }
  getUsernames() {
    this._registrationService.getAllUsernames().subscribe(response => {
      this.usernames = response;
    })
  }
  register() {
    this._registrationService.postUser(this.studentRegistrationForm.value).subscribe(response => {
      this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });
      setTimeout(() => {
        this.studentRegistrationForm.reset();
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
      return this.checkIfUsernameExists(this.studentRegistrationForm.controls['username'].value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }


  get firstName() {
    return this.studentRegistrationForm.get('firstName')
  }
  get lastName() {
    return this.studentRegistrationForm.get('lastName')
  }
  get username() {
    return this.studentRegistrationForm.get('username')
  }
  get password() {
    return this.studentRegistrationForm.get('password')
  }
  get mobileNo() {
    return this.studentRegistrationForm.get('mobileNo')
  }
  get dateOfBirth() {
    return this.studentRegistrationForm.get('dateOfBirth')
  }
}