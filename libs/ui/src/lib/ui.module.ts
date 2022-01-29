import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { TagComponent } from './tag/tag.component';

@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TagComponent
  ]
})
export class UiModule {}
