import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YmrlkCommonModule } from '@ymrlk-code-blog/ymrlk-common';

import { TagComponent } from './tag/tag.component';
import { FormControlComponent } from './form-control/form-control.component';

@NgModule({
  declarations: [
    TagComponent,
    FormControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YmrlkCommonModule
  ],
  exports: [
    TagComponent,
    FormControlComponent
  ]
})
export class UiModule {}
