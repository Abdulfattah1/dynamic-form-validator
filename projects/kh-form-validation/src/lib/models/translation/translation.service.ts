import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of, shareReplay, take, tap } from 'rxjs';
import { isDefined } from '../../helpers/is-defined';
import { KhValidatorTranslateLoader } from '../translation/translate-loader';
export const DEFAULT_LANG = new InjectionToken('DEFAULT_LANG');
@Injectable()
export class TranslationService {
  /**
   * @description
   * It holds a subscription to the loaded language
   */
  private loadingTranslations: Observable<any>;
  /**
   * @description
   * It holds the fetched languages as key and values
   */
  private translations: { [propName: string]: any } = {};

  /**
   * @description
   * When the translation files gets loaded it turns to be true
   */
  private loaded: boolean;

  /**
   *
   * @param defaultLang Provided default langauge whitch the user can also set it in the config obj
   * @param khValidatorTranslateLoader It loads the translation files
   */
  constructor(
    @Inject(DEFAULT_LANG) private defaultLang: string,
    private khValidatorTranslateLoader: KhValidatorTranslateLoader
  ) {
    this.getTranslations();
  }

  private getTranslations(): void {
    this.loaded = false;
    this.loadingTranslations = this.khValidatorTranslateLoader
      .loadTranslation(this.defaultLang)
      .pipe(
        tap((_) => (this.loaded = true)),
        take(1),
        shareReplay(1)
      );

    this.loadingTranslations.subscribe((data) => {
      if (!!data) {
        this.translations[this.defaultLang] = { ...data };
      }
    });
  }

  get(key: string, params?: { [key: string]: any }): string {
    let res;
    if (!isDefined(key) || !key.length) {
      return null;
    }
    if (!this.loaded) {
      this.loadingTranslations.subscribe((data) => {
        res = this.getTranslatedValue(key);
      });
    } else {
      res = this.getTranslatedValue(key);
    }

    if (!!params && isDefined(res)) {
      return this.parseResult(res, params);
    }

    return res ? res : null;
  }

  private getTranslatedValue(key: string): string {
    return this.translations[this.defaultLang][key];
  }

  private parseResult(value: string, params: { [key: string]: any }): string {
    Object.keys(params).forEach((_key) => {
      value = value.replace(`{{${_key}}}`, params[_key]);
    });
    return value;
  }
}
