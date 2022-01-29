import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorMessagesDirective } from './directives/error-messages/error-messages.directive';
import {
  ErrorMessagesContainerComponent
} from './directives/error-messages/error-messages-container/error-messages-container.component';

@NgModule({
  declarations: [
    ErrorMessagesDirective,
    ErrorMessagesContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMessagesDirective
  ]
})
export class YmrlkCommonModule {}
