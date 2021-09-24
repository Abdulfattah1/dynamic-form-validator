import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[khComponentBase]',
})
export class ComponentBaseDirective {
  destroy$: Subject<boolean> = new Subject();
  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
