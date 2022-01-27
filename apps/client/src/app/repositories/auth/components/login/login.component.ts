import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubSink } from 'subsink';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ymrlk-code-blog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});

  private subSink: SubSink = new SubSink();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.required] ]
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
