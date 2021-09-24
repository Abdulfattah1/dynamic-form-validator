import { NgModule } from '@angular/core';
import { KhFormValidationComponent } from './kh-form-validation.component';
import { InputValidatorDirective } from './directives/input-validator.directive';
import { ErrorComponentOneComponent } from './components/error-component-one/error-component-one.component';
import { ErrorHostElementDirective } from './directives/error-host-element.directive';
import { CommonModule } from '@angular/common';
import { FormSubmissionDirective } from './directives/form-submission.directive';
import { ErrorComponentDirective } from './directives/error-component.directive';
import { SubmitButtonDirective } from './directives/submit-button.directive';
import { ComponentBaseDirective } from './directives/component-base.directive';

@NgModule({
  declarations: [
    KhFormValidationComponent,
    InputValidatorDirective,
    ErrorComponentOneComponent,
    ErrorHostElementDirective,
    FormSubmissionDirective,
    ErrorComponentDirective,
    SubmitButtonDirective,
    ComponentBaseDirective,
  ],
  imports: [CommonModule],
  exports: [
    KhFormValidationComponent,
    InputValidatorDirective,
    ErrorComponentOneComponent,
    ErrorHostElementDirective,
    FormSubmissionDirective,
    SubmitButtonDirective,
  ],
})
export class KhFormValidationModule {}
