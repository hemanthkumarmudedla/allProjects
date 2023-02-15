import { Component, OnInit } from '@angular/core';
import { IdStorageService } from 'src/app/services/id-storage.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: '.app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  studentData: any;
  score!: number;

  constructor(private _resultsService: ResultsService, private _idStorageService: IdStorageService) { }

  ngOnInit(): void {
    // this.getStudentData();
    this.getScore();
  }

  getScore() {
    this.score = Math.floor(Math.random()*100);
  }
  getStudentData() {
    return this._resultsService.getUserById(this._idStorageService.getId()).subscribe(response => {
      this.studentData = response;
    });
  }
}
