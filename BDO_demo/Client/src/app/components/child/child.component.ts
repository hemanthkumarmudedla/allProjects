import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  childValue: number = 0;
  @Output() valueEvent = new EventEmitter<number>();

  @Input() childCounter!: number;

  constructor() { }

  ngOnInit(): void {
  }
  changeValue() {
    this.childValue = this.childValue + this.childCounter;
  }
  sendValue() {
    this.valueEvent.emit(this.childValue);
  }
}
