import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  parentValue!: number;
  
  parentCounter!: number;

  changeCounter() {
    this.parentCounter = Math.floor(Math.random() * 100);
  }
  receiveValue($event: any) {
    this.parentValue = $event;
    console.log("Value is received");
  }

  constructor() { 
    console.log("Contructor is called");
  }
  ngOnInit(): void {
    console.log()
    console.log("ngOnInit is called");
  }
  ngOnChanges(): void {
    console.log("ngOnChanges is called");
  }
  ngDoCheck(): void {
    console.log("ngDoCheck is called");
  }
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit is called");
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked is called");
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit is called");
  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked is called");
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
  }
}
