import { InjectionToken } from '@angular/core';

export const DEFAULT_ERRORS = {
  required: (error) => 'THIS_FIELD_IS_REQUIRED',
  minLength: ({ requiredLength, actualLength }) =>
    `MIN_LENGTH_SHOULD_BE_MORE_THAN_OR_EQUAL_TO ${requiredLength}`,
  maxLength: ({ requiredLength, actualLength }) =>
    `MAX_LENGTH_SHOULD_BE_MORE_THAN ${requiredLength}`,
  unique: (error) => `THIS_FIELD_SHOULD_BE_UNIQUE`,
};

export const DEFAULT_FORM_ERRORS = new InjectionToken('DEFAULT_FORM_ERRORS', {
  providedIn: 'root',
  factory: () => DEFAULT_ERRORS,
});
