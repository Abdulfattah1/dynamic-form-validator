import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhFormValidationComponent } from './kh-form-validation.component';

describe('KhFormValidationComponent', () => {
  let component: KhFormValidationComponent;
  let fixture: ComponentFixture<KhFormValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhFormValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
