import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '@ymrlk-code-blog/ui';
import { YmrlkCommonModule } from '@ymrlk-code-blog/ymrlk-common';

import { UiTestExamplesRoutingModule } from './ui-test-examples-routing.module';
import { TestExamplesComponent } from './components/test-examples/test-examples.component';


@NgModule({
  declarations: [
    TestExamplesComponent
  ],
  imports: [
    CommonModule,
    UiTestExamplesRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    UiModule,
    YmrlkCommonModule
  ]
})
export class UiTestExamplesModule { }
