import { NgModule } from '@angular/core';
import { KhFormValidationComponent } from './kh-form-validation.component';
import { InputValidatorDirective } from './directives/input-validator.directive';
import { ErrorComponentOneComponent } from './components/error-component-one/error-component-one.component';
import { ErrorHostElementDirective } from './directives/error-host-element.directive';

@NgModule({
  declarations: [
    KhFormValidationComponent,
    InputValidatorDirective,
    ErrorComponentOneComponent,
    ErrorHostElementDirective,
  ],
  imports: [],
  exports: [
    KhFormValidationComponent,
    InputValidatorDirective,
    ErrorComponentOneComponent,
    ErrorHostElementDirective,
  ],
})
export class KhFormValidationModule {}
