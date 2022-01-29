import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubSink } from 'subsink';

import { ErrorMessageCallerInterface, ValidatorsKeyType } from '@ymrlk-code-blog/ymrlk-common';

import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../../../classes/custom-validators';
import {
  ConfirmPasswordErrorMessageCallerInterface
} from '../../interfaces/confirm-password-error-message-caller.interface';

@Component({
  selector: 'ymrlk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup = new FormGroup({});

  firstAndLastNameErrorMessages: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field`,
    [ValidatorsKeyType.MIN_LENGTH]: (param: any) => `Minimum length of field is ${ param.requiredLength } symbols`
  };
  emailErrorMessages: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.EMAIL]: () => `Is invalid`,
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`
  };
  passwordErrorMessages: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`,
    [ValidatorsKeyType.MIN_LENGTH]: (param: any) => `Minimum length of field is ${ param.requiredLength } symbols`
  };
  confirmPasswordErrorMessages: ConfirmPasswordErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Required field.`,
    passwordMismatch: () => `Confirmation password does not match`
  };

  private subSink: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:        ['', [Validators.required, Validators.minLength(3)]],
      lastName:         ['', [Validators.required, Validators.minLength(3)]],
      email:            ['', [Validators.email, Validators.required]],
      password:         ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword:  ['', [Validators.required]]
    }, {
      validators: CustomValidators.passwordsMatchValidator('password', 'confirmPassword')
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  submit(): void {
    console.log(this.registerForm.value);
  }
}
