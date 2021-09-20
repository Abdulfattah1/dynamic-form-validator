import { InjectionToken } from '@angular/core';

export const DEFAULT_ERRORS = {
  required: (error) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
};

export const DEFAULT_FORM_ERRORS = new InjectionToken('DEFAULT_FORM_ERRORS', {
  providedIn: 'root',
  factory: () => DEFAULT_ERRORS,
});
