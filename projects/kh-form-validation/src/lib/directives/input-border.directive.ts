import {
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  InputBorderConfig,
  INPUT_BORDER_CONFIG,
} from '../models/input-border-config';

@Directive({
  selector: '[formControl],[formControlName],[khInputBorder]',
})
export class InputBorderDirective {
  @HostBinding('style.border-style') get borderStyle(): string {
    return this.showError ? this.borderConfig.borderStyle : null;
  }
  @HostBinding('style.border-width') get borderWidth(): string {
    return this.showError ? this.borderConfig.borderWidth : null;
  }
  @HostBinding('style.border-color') get borderColor(): string {
    return this.showError
      ? this.borderConfig.colors[this.control.status]
      : null;
  }
  constructor(
    private host: ElementRef<any>,
    @Self() private control: NgControl,
    @Inject(INPUT_BORDER_CONFIG) private borderConfig: InputBorderConfig
  ) {}

  get element() {
    return this.host.nativeElement;
  }

  get showError(): boolean {
    return this.control.dirty && this.control.touched;
  }
}
