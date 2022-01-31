import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorMessageCallerInterface, ValidatorsKeyType } from '@ymrlk-code-blog/ymrlk-common';

import { AuthService } from '../../services/auth.service';
import { AuthBaseComponent } from '../auth-base/auth-base.component';

@Component({
  selector: 'ymrlk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends AuthBaseComponent implements OnInit, OnDestroy {

  emailErrorMessageCallers: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.EMAIL]: () => `Is invalid`, // TODO Add translated text here
    [ValidatorsKeyType.REQUIRED]: () => `Required field` // TODO Add translated text here
  };
  passwordErrorMessageCaller: ErrorMessageCallerInterface = {
    [ValidatorsKeyType.REQUIRED]: () => `Is required` // TODO Add translated text here
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:    ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.required] ]
    });
  }

  override submit(): void {
    this.subSink.sink = this.authService.login({ ...this.form.value }).subscribe(
      (isLoggedIn: boolean) => isLoggedIn && this.router.navigate(['feed'])
    );
  }

  override ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
