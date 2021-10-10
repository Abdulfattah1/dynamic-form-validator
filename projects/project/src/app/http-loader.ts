import { KhValidatorTranslateLoader } from 'kh-form-validation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export class KhHttpTranslationLoader extends KhValidatorTranslateLoader {
  /**
   *
   * @param http should be passed with deps property
   * @param prefix the url where the translation files exist (/assets/i18n)
   * @param suffix the file extention (.json)
   */
  constructor(
    private http: HttpClient,
    private prefix: string,
    private suffix: string
  ) {
    super();
  }

  loadTranslation(lang: string): Observable<Object> {
    /**
     * @description
     * load the files based on the provided url
     * @returns Observable contain the specified file exp..(assets/error-messages/en.json)
     */
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
