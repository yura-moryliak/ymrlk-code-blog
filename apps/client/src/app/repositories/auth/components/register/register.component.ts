import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SubSink } from 'subsink';

import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../../../classes/custom-validators';

@Component({
  selector: 'ymrlk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup = new FormGroup({});

  private subSink: SubSink = new SubSink();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:        ['', Validators.required],
      lastName:         ['', Validators.required],
      email:            ['', [Validators.email, Validators.required]],
      password:         ['', [Validators.required, Validators.minLength]],
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
