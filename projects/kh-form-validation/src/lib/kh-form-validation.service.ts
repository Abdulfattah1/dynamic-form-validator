import { Injectable, Type } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ErrorTypeEnum } from './models/error-type.enum';
import { ErrorComponentOneComponent } from './components/error-component-one/error-component-one.component';
import { Observable, Subject } from 'rxjs';
export const DEFAULT_ERRORS = {
  required: (_) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
};

@Injectable({
  providedIn: 'root',
})
export class KhFormValidationService {
  errors: { [validatorName: string]: (error: Object) => string };

  constructor() {
    this.errors = { ...DEFAULT_ERRORS };
  }

  hasError(control: NgControl): boolean {
    return control.control.errors ? true : false;
  }

  getErrors(control: NgControl): any {
    return control.control.errors ? control.control.errors : null;
  }

  getError(control: NgControl): string {
    const _errorName = Object.keys(control.control.errors)[0];
    const _params = control.control.errors[_errorName];
    const _errorFun = this.errors[_errorName];
    return _errorFun(_params);
  }

  addValidator(errorName: string, returnedMessage: string): void {
    if (!!errorName) {
      this.errors[errorName] = (params) => returnedMessage;
    } else {
      throw new Error('Provide the error key name');
    }
  }

  getComponent(type: ErrorTypeEnum): Type<any> {
    switch (type) {
      case ErrorTypeEnum.Simple:
        return ErrorComponentOneComponent;
      default:
        return ErrorComponentOneComponent;
    }
  }
}
