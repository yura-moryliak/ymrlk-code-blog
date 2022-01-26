import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SubSink } from 'subsink';

import { AuthService } from '../../services/auth.service';

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
    private http: HttpClient // TODO REMOVE AFTER TEST
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required] ],
      password: ['', [Validators.required] ]
    });

  }

  submit(): void {
    this.subSink.sink = this.authService.login({ ...this.loginForm.value }).subscribe((isLoggedIn: boolean) => {
      console.log(isLoggedIn);
    });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  // TODO REMOVE AFTERWARDS
  getProfile(): void {
    this.http.get('http://localhost:3000/api/users/profile').subscribe((profile) => console.log(profile));
  }
}