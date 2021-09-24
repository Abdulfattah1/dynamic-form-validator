import { InjectionToken } from '@angular/core';

export interface IinputBorderConfig {
  borderWidth: string;
  borderStyle: string;
  colors: Icolor;
}

export interface Icolor {
  VALID: string;
  INVALID: string;
  PENDING: string;
  DISABLED: string;
}

export class InputBorderConfig implements IinputBorderConfig {
  borderWidth: string;
  borderStyle: string;
  colors: Icolor;
  constructor(inputBorderConfig: IinputBorderConfig) {
    this.borderStyle = inputBorderConfig.borderStyle || 'solid';
    this.borderWidth = inputBorderConfig.borderWidth || '1px';
    this.colors = inputBorderConfig?.colors || {
      VALID: 'green',
      INVALID: 'red',
      PENDING: 'yellow',
      DISABLED: 'silver',
    };
  }
}

export const INPUT_BORDER_CONFIG = new InjectionToken<InputBorderConfig>(
  'Input border cinfig',
  {
    providedIn: 'root',
    factory: () => new InputBorderConfig(DEFAULT_INPUT_CONFIG),
  }
);

export const DEFAULT_INPUT_CONFIG: InputBorderConfig = {
  borderStyle: 'solid',
  borderWidth: '1px',
  colors: {
    VALID: 'green',
    INVALID: 'red',
    PENDING: 'yellow',
    DISABLED: 'silver',
  },
};
