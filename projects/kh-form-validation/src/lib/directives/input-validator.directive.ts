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
  SkipSelf,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidatorHelperService } from '../helpers/validator-helper.service';
import { ErrorTypeEnum } from '../models/error-type.enum';
import { ErrorHostElementDirective } from './error-host-element.directive';

@Directive({
  selector: '[formControl],[formControlName],[inputValidator]',
})
export class InputValidatorDirective implements OnInit {
  @Input() type = ErrorTypeEnum.Simple;
  @Input() customErrors;
  componentRef: ComponentRef<any>;
  container: ViewContainerRef;
  constructor(
    private vcr: ViewContainerRef,
    @Self() private control: NgControl,
    private resolver: ComponentFactoryResolver,
    private validatorHelper: ValidatorHelperService,
    @Optional() errorHostElementDirective: ErrorHostElementDirective
  ) {
    this.container = errorHostElementDirective
      ? errorHostElementDirective.vcr
      : vcr;
  }

  ngOnInit(): void {
    /** Subscribe to the control value changes to apply the validators*/
    this.control.valueChanges.subscribe((_) => {
      if (this.validatorHelper.hasError(this.control)) {
        this.handleErrors();
      } else {
        this.displayError(null);
      }
    });
  }

  handleErrors(): void {
    const _error = this.validatorHelper.getError(this.control);
    this.displayError(_error);
  }

  displayError(error: string): void {
    if (!this.componentRef) {
      const _factory = this.resolver.resolveComponentFactory(
        this.validatorHelper.getComponent(this.type)
      );
      this.componentRef = this.container.createComponent(_factory);
    } else {
      this.componentRef.instance.message = error;
    }
  }

  removeComponent(): void {}
}
