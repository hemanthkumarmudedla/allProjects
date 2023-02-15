import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _profileService: ProfileService) { }

  name!:string;
  email!:string;

  ngOnInit(): void {
    this.name = this._profileService.getName();
    this.email = this._profileService.getEmail();
  }

}
