import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ErrorComponentDirective } from '../../directives/error-component.directive';
import { IerrorComponent } from '../../models/Ierrors-component';

@Component({
  selector: 'kh-error-component-one',
  templateUrl: './error-component-one.component.html',
  styleUrls: ['./error-component-one.component.css'],
})
export class ErrorComponentOneComponent
  extends ErrorComponentDirective
  implements OnInit
{
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit(): void {}
}
