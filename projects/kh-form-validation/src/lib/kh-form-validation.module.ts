import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
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
import {
  KhValidatorDefaultTranslateLoader,
  KhValidatorTranslateLoader,
} from '../public-api';
import { DEFAULT_LANG } from './models/translation/translation.service';
import { TranslationPipe } from './models/translation/translation.pipe';
import { TranslationService } from './models/translation/translation.service';
import { HttpClientModule } from '@angular/common/http';
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
    TranslationPipe,
  ],
  imports: [CommonModule, HttpClientModule],
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
  public static forRoot(
    config: {
      defaultLang?: string;
      borderConfig?: IinputBorderConfig;
      loader?: Provider;
    } = {}
  ): ModuleWithProviders<KhFormValidationModule> {
    if (!config || !config?.borderConfig) {
      config.borderConfig = DEFAULT_INPUT_CONFIG;
    }
    return {
      ngModule: KhFormValidationModule,
      providers: [
        {
          provide: DEFAULT_LANG,
          useValue: config.defaultLang || 'en',
        },
        {
          provide: INPUT_BORDER_CONFIG,
          useFactory: () => new InputBorderConfig(config.borderConfig),
        },
        config.loader || {
          provide: KhValidatorTranslateLoader,
          useClass: KhValidatorDefaultTranslateLoader,
        },
        TranslationService,
      ],
    };
  }
}
