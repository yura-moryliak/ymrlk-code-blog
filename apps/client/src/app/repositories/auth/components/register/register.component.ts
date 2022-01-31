import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ErrorMessageCallerInterface, ValidatorsKeyType } from '@ymrlk-code-blog/ymrlk-common';

import { UsersService } from '../../../user/services/users.service';
import { CustomValidators } from '../../../../classes/custom-validators';
import {
  ConfirmPasswordErrorMessageCallerInterface
} from '../../interfaces/confirm-password-error-message-caller.interface';
import { AuthBaseComponent } from '../auth-base/auth-base.component';

@Component({
  selector: 'ymrlk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends AuthBaseComponent implements OnInit, OnDestroy {

  firstAndLastNameErrorMessageCallers: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field`,
    [ValidatorsKeyType.MIN_LENGTH]: (param: any) => `Minimum length of field is ${ param.requiredLength } symbols`
  };
  emailErrorMessageCallers: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.EMAIL]: () => `Is invalid`,
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`
  };
  passwordErrorMessageCallers: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`,
    [ValidatorsKeyType.MIN_LENGTH]: (param: any) => `Minimum length of field is ${ param.requiredLength } symbols`
  };
  confirmPasswordErrorMessageCallers: ConfirmPasswordErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`,
    passwordMismatch: () => `Confirmation password does not match`
  };

  // TODO remove after impl
  enableMockUserData = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName:        ['', [Validators.required, Validators.minLength(3)]],
      lastName:         ['', [Validators.required, Validators.minLength(3)]],
      email:            ['', [Validators.email, Validators.required]],
      password:         ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword:  ['', [Validators.required]]
    }, {
      validators: CustomValidators.passwordsMatchValidator('password', 'confirmPassword')
    });
  }

  override submit(): void {
    this.subSink.sink = this.usersService.register(this.form.value).subscribe((isRegistered: boolean) => {

      if (isRegistered) {
        // TODO Show success notification with corresponding message
        // Clear reactive form state pristine
        console.log('User created...');
      }

    });
  }

  override ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }


  // TODO remove after impl
  patchFormValue(): void {

    if (this.enableMockUserData) {
      this.form.patchValue({
        firstName: 'Yura',
        lastName: 'Moryliak',
        email: 'moryliak.y@gmail.com',
        password: '12345',
        confirmPassword: '12345'
      });
    }

  }
}
