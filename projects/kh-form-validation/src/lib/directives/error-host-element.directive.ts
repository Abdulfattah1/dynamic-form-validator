import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[khErrorHostElement]',
})
export class ErrorHostElementDirective {
  constructor(public vcr: ViewContainerRef) {}
}
