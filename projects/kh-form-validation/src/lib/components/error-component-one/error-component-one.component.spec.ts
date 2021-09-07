import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponentOneComponent } from './error-component-one.component';

describe('ErrorComponentOneComponent', () => {
  let component: ErrorComponentOneComponent;
  let fixture: ComponentFixture<ErrorComponentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponentOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
