import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { KhFormValidationService } from '../kh-form-validation.service';

import { ErrorTypeEnum } from '../models/error-type.enum';
import { ErrorHostElementDirective } from './error-host-element.directive';

@Directive({
  selector: '[formControl],[formControlName],[inputValidator]',
})
export class InputValidatorDirective implements OnInit {
  @Input() type = ErrorTypeEnum.Simple;
  @Input()
  componentRef: ComponentRef<any>;
  container: ViewContainerRef;
  @Input() customTemplate: TemplateRef<any>;
  constructor(
    vcr: ViewContainerRef,
    @Self() private control: NgControl,
    private resolver: ComponentFactoryResolver,
    private khFormValidationService: KhFormValidationService,
    @Optional() errorHostElementDirective: ErrorHostElementDirective
  ) {
    this.container = errorHostElementDirective
      ? errorHostElementDirective.vcr
      : vcr;
  }

  ngOnInit(): void {
    /** Subscribe to the control value changes to apply the validators*/
    this.control.valueChanges.subscribe((_) => {
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
    if (!!this.customTemplate && error) {
      this.container.createEmbeddedView(this.customTemplate, {
        $implicit: error,
      });
    } else {
      this.container.clear();
    }
  }

  renderComponent(error: string): void {
    if (!this.componentRef) {
      const _factory = this.resolver.resolveComponentFactory(
        this.khFormValidationService.getComponent(this.type)
      );
      this.componentRef = this.container.createComponent(_factory);
    } else {
      this.componentRef.instance.message = error;
    }
  }

  removeComponent(): void {}
}
