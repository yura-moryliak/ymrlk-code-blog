import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static passwordsMatchValidator(firstPwKey: string, secondPwKey: string): ValidatorFn {

    return (control: AbstractControl): any => {

      const pw: string = control.get(firstPwKey)?.value;
      const confirmPw: string = control.get(secondPwKey)?.value;

      if (!pw || !confirmPw) {
        return null;
      }

      const error = pw !== confirmPw ? { passwordMismatch: true } : null;

      control.get(secondPwKey)?.setErrors(error);
    };
  }


}
