import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { ErrorComponentOneComponent } from '../components/error-component-one/error-component-one.component';
import { ErrorTypeEnum } from '../models/error-type.enum';
import { DEFAULT_FORM_ERRORS } from './error-messages.helper';

@Injectable({
  providedIn: 'root',
})
export class ValidatorHelperService {
  constructor(@Inject(DEFAULT_FORM_ERRORS) private errors) {}

  hasError(control: NgControl): boolean {
    return control.errors ? true : false;
  }

  getErrors(control: NgControl): any {
    return control.errors ? control.errors : null;
  }

  getError(control: NgControl): string {
    const _errorName = Object.keys(control.errors)[0];
    return _errorName[this.errors[_errorName]];
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
