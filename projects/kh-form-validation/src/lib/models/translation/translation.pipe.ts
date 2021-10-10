import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translation',
  pure: false,
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}
  transform(value: string, ...args: unknown[]): unknown {
    return null;
  }
}
