import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SubSink } from 'subsink';

import { ErrorMessageCallerInterface } from '@ymrlk-code-blog/ymrlk-common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ymrlk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});

  emailErrorMessages: ErrorMessageCallerInterface = {
    email: () => `Is not valid`, // TODO Add translated text here
    required: () => `Is required` // TODO Add translated text here
  };

  passwordErrorMessages: ErrorMessageCallerInterface = {
    required: () => `Is required`, // TODO Add translated text here
    minlength: (param: any) => `Minlength ${ param.requiredLength }` // TODO Add translated text here
  };

  private subSink: SubSink = new SubSink();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email:    ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.required, Validators.minLength(5)] ]
    });

  }

  submit(): void {
    this.subSink.sink = this.authService.login({ ...this.loginForm.value }).subscribe(
      (isLoggedIn: boolean) => isLoggedIn && this.router.navigate(['feed'])
    );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
