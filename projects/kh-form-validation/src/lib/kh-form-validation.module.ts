import { ModuleWithProviders, NgModule } from '@angular/core';
import { KhFormValidationComponent } from './kh-form-validation.component';
import { InputValidatorDirective } from './directives/input-validator.directive';
import { ErrorComponentOneComponent } from './components/error-component-one/error-component-one.component';
import { ErrorHostElementDirective } from './directives/error-host-element.directive';
import { CommonModule } from '@angular/common';
import { FormSubmissionDirective } from './directives/form-submission.directive';
import { ErrorComponentDirective } from './directives/error-component.directive';
import { SubmitButtonDirective } from './directives/submit-button.directive';
import { ComponentBaseDirective } from './directives/component-base.directive';
import {
  DEFAULT_INPUT_CONFIG,
  IinputBorderConfig,
  InputBorderConfig,
  INPUT_BORDER_CONFIG,
} from './models/input-border-config';
import { InputBorderDirective } from './directives/input-border.directive';

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
    InputBorderDirective,
  ],
  imports: [CommonModule],
  exports: [
    KhFormValidationComponent,
    InputValidatorDirective,
    ErrorComponentOneComponent,
    ErrorHostElementDirective,
    FormSubmissionDirective,
    SubmitButtonDirective,
    InputBorderDirective,
  ],
})
export class KhFormValidationModule {
  public static forRoot(config: {
    borderConfig: IinputBorderConfig;
  }): ModuleWithProviders<KhFormValidationModule> {
    if (!config || !config?.borderConfig) {
      config.borderConfig = DEFAULT_INPUT_CONFIG;
    }
    return {
      ngModule: KhFormValidationModule,
      providers: [
        {
          provide: INPUT_BORDER_CONFIG,
          useFactory: () => new InputBorderConfig(config.borderConfig),
        },
      ],
    };
  }
}
