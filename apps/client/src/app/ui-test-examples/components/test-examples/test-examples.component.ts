import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  getSelectedTag(selectedTag: string): void {
    console.log(selectedTag);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.required]]
    });
  }
}
