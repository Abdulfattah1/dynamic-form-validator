import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, Subject, takeUntil } from 'rxjs';
import { KhFormValidationService } from '../kh-form-validation.service';

import { ErrorTypeEnum } from '../models/error-type.enum';
import { ComponentBaseDirective } from './component-base.directive';
import { ErrorHostElementDirective } from './error-host-element.directive';
import { FormSubmissionDirective } from './form-submission.directive';

@Directive({
  selector: '[formControl],[formControlName],[inputValidator]',
})
export class InputValidatorDirective
  extends ComponentBaseDirective
  implements OnInit, OnDestroy
{
  @Input() type = ErrorTypeEnum.Simple;
  @Input() componentRef: ComponentRef<any>;
  @Input() customTemplate: TemplateRef<any>;

  container: ViewContainerRef;
  submit$: Observable<any>;

  constructor(
    vcr: ViewContainerRef,
    @Self() private control: NgControl,
    private resolver: ComponentFactoryResolver,
    private khFormValidationService: KhFormValidationService,
    @Optional() @Host() private form: FormSubmissionDirective,
    @Optional() errorHostElementDirective: ErrorHostElementDirective
  ) {
    super();
    this.container = errorHostElementDirective
      ? errorHostElementDirective.vcr
      : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): void {
    /** Subscribe to the control value changes to apply the validators*/
    merge(this.submit$, this.control.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        if (this.khFormValidationService.hasError(this.control)) {
          this.handleErrors();
        } else {
          this.displayError(null);
        }
      });
  }

  handleErrors(): void {
    const _error = this.khFormValidationService.getError(this.control);
    this.displayError(_error);
  }

  displayError(error: string): void {
    if (!!this.customTemplate) {
      this.renderEmbeddedView(error);
    } else {
      this.renderComponent(error);
    }
  }

  renderEmbeddedView(error: string): void {
    this.container.clear();
    if (!!this.customTemplate && error) {
      this.container.createEmbeddedView(this.customTemplate, {
        $implicit: error,
      });
    }
  }

  renderComponent(error: string): void {
    if (!this.componentRef) {
      const _factory = this.resolver.resolveComponentFactory(
        this.khFormValidationService.getComponent(this.type)
      );
      this.componentRef = this.container.createComponent(_factory);
    }
    this.componentRef.instance.message = error;
  }

  removeComponent(): void {}
}
