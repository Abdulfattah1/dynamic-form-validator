import { TestBed } from '@angular/core/testing';

import { KhFormValidationService } from './kh-form-validation.service';

describe('KhFormValidationService', () => {
  let service: KhFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
