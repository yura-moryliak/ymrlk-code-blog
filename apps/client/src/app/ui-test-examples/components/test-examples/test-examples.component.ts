import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ErrorMessageCallerInterface } from '@ymrlk-code-blog/ymrlk-common';

@Component({
  selector: 'ymrlk-test-examples',
  templateUrl: './test-examples.component.html',
  styleUrls: ['./test-examples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestExamplesComponent implements OnInit {

  tagsList: string[] = [
    'All',
    'Angular',
    'TyeScript',
    'NestJs',
    'MongoDB'
  ];
  selectedTagsList: string[] = [];

  form: FormGroup = new FormGroup({});

  emailErrorMessageCallers: ErrorMessageCallerInterface = {
    email: () => `Is invalid. Provide valid email`,
    required: () => `Required field`
  };
  passwordErrorMessageCallers: ErrorMessageCallerInterface = {
    required: () => `Required field`,
    minlength: (param: any) => `Min length is ${ param.requiredLength } symbols`
  };
  value = 'moryliak.y@gmail.com';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  getSelectedTag(selectedTag: string): void {
    console.log(selectedTag);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['moryliak.y@gmail.com', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
