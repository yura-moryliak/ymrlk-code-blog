import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '@ymrlk-code-blog/ui';

import { UiTestExamplesRoutingModule } from './ui-test-examples-routing.module';
import { TestExamplesComponent } from './components/test-examples/test-examples.component';


@NgModule({
  declarations: [
    TestExamplesComponent
  ],
  imports: [
    CommonModule,
    UiTestExamplesRoutingModule,

    UiModule
  ]
})
export class UiTestExamplesModule { }
