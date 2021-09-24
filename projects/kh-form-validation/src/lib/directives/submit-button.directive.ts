import {
  Directive,
  ElementRef,
  Host,
  Optional,
  Renderer2,
} from '@angular/core';
import { merge, takeUntil } from 'rxjs';
import { ComponentBaseDirective } from './component-base.directive';
import { FormSubmissionDirective } from './form-submission.directive';

@Directive({
  selector: '[khSubmitButton],button[type=submit]',
})
export class SubmitButtonDirective extends ComponentBaseDirective {
  constructor(
    private host: ElementRef<HTMLButtonElement>,
    @Optional() @Host() private form: FormSubmissionDirective
  ) {
    super();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    merge(this.form.status$)
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: boolean) => {
        this.element.disabled = !status;
      });
  }

  get element(): HTMLButtonElement {
    return this.host.nativeElement;
  }
}
