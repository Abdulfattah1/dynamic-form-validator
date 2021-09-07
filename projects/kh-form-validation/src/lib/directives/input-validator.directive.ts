import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidatorHelperService } from '../helpers/validator-helper.service';
import { ErrorTypeEnum } from '../models/error-type.enum';
import { ErrorHostElementDirective } from './error-host-element.directive';

@Directive({
  selector: '[formControl],[formControlName]',
})
export class InputValidatorDirective implements OnInit, OnDestroy {
  @Input() type: ErrorTypeEnum;
  componentRef: ComponentRef<any>;
  container: ViewContainerRef;
  destroy$: Subject<boolean> = new Subject();
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
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      if (this.validatorHelper.hasError(this.control)) {
        this.handleErrors();
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
  ngOnDestroy(): void {
    /** Used to unsubscribe from all the observables*/
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
