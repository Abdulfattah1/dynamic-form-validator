import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { IerrorComponent } from '../models/Ierrors-component';

@Directive({
  selector: '[khErrorComponent]',
})
export class ErrorComponentDirective implements IerrorComponent {
  @Input() set message(message: string) {
    this._message = message;
    this.cdr.detectChanges();
  }
  get message(): string {
    return this._message;
  }
  private _message = '';
  constructor(private cdr: ChangeDetectorRef) {}
}
