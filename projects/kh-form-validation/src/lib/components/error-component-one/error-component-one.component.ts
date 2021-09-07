import { Component, Input, OnInit } from '@angular/core';
import { IerrorComponent } from '../../models/Ierrors-component';

@Component({
  selector: 'kh-error-component-one',
  templateUrl: './error-component-one.component.html',
  styleUrls: ['./error-component-one.component.css'],
})
export class ErrorComponentOneComponent implements OnInit, IerrorComponent {
  @Input() message: string;
  constructor() {}

  ngOnInit(): void {}
}
