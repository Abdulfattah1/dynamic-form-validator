import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KhHttpTranslationLoader } from './http-loader';
import { HttpClient } from '@angular/common/http';
import {
  KhFormValidationModule,
  KhValidatorTranslateLoader,
} from 'kh-form-validation';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    KhFormValidationModule.forRoot({
      /**
       * @property {string} used to holds the default language of the translation file
       */
      defaultLang: 'ar',
      /**
       * Of type Provider
       */
      loader: {
        provide: KhValidatorTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 *
 * @param http Should be passed to the loader
 * @returns Translation file
 */
function HttpLoaderFactory(http: HttpClient) {
  return new KhHttpTranslationLoader(http, './assets/error-messages/', '.json');
}
