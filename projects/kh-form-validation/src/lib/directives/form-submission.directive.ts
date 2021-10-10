import { Directive, ElementRef, Self } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
} from 'rxjs';

@Directive({
  selector: '[khFormSubmission],form',
})
export class FormSubmissionDirective {
  /**
   * @property {Observable} used to subscribe to the form changes
   */
  change$: Observable<any> = new Observable();
  /**
   * @property {fromEvent} used to listen to the submit button
   */
  submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));
  /**
   * @property {Observable} used to subscribe to the form status
   */
  status$: Observable<boolean>;
  constructor(
    @Self() private control: ControlContainer,
    private host: ElementRef<HTMLFormElement>
  ) {}

  ngOnInit(): void {
    this.change$ = this.form.valueChanges.pipe(shareReplay(1));
    this.status$ = this.form.statusChanges.pipe(
      startWith(this.form.status),
      map((status) => (status === 'INVALID' ? false : true)),
      distinctUntilChanged()
    );
  }

  get element(): HTMLFormElement {
    return this.host.nativeElement;
  }

  get form(): AbstractControl {
    return this.control.control;
  }
}
