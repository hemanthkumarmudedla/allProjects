import { Component, OnInit } from '@angular/core';
import { IdStorageService } from 'src/app/services/id-storage.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  studentData: any;

  constructor(private _registrationService: RegistrationService, private _idStorageService: IdStorageService) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    return this._registrationService.getUserById(this._idStorageService.getId()).subscribe(response => {
      this.studentData = response;
    });
  }
}