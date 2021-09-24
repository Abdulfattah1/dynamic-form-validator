import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KhFormValidationModule } from 'kh-form-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DEFAULT_INPUT_CONFIG,
  InputBorderConfig,
} from 'projects/kh-form-validation/src/lib/models/input-border-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    KhFormValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
