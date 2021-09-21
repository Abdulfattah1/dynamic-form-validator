import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { KhFormValidationService } from 'kh-form-validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  control: FormControl;
  customErrors = { required: 'Please accept the terms' };
  constructor(
    private builder: FormBuilder,
    private kh: KhFormValidationService
  ) {}

  ngOnInit() {
    this.kh.addValidator(
      'normalizedNameError',
      'Please dont add the word test'
    );
    this.form = this.builder.group({
      name: this.builder.group(
        {
          first: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(10),
            ],
          ],
          last: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(10),
            ],
          ],
        },
        [Validators.required]
      ),
      age: [null, [Validators.required]],
      address: ['', [this.customValidator]],
    });
  }

  customValidator(control: AbstractControl): ValidationErrors {
    if (!!control.value && control.value === 'test') {
      return {
        normalizedNameError: 'test',
      };
    }
    return null;
  }
}
