import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class SharedModule { }
