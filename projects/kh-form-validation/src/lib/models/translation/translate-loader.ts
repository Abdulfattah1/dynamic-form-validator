import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * A base class to make all loaders implement the same methods
 */
export abstract class KhValidatorTranslateLoader {
  abstract loadTranslation(lang: string): Observable<Object>;
}

/**
 * @param lang holds the currently used language
 * @returns an Empty object as an observable
 * @description
 * In Case the user dosn't pass any custom loader return an empty object
 * The user should pass its custom loader function using to forRoot method
 */
@Injectable()
export class KhValidatorDefaultTranslateLoader extends KhValidatorTranslateLoader {
  loadTranslation(lang: string): Observable<Object> {
    return of({});
  }
}
