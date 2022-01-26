import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedProviders } from '../../shared/providers/shared-providers';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './components/feed/feed.component';



@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ],
  providers: [
    SharedProviders.provideAuthInterceptor(),
    SharedProviders.provideErrorHandlerInterceptor(),
  ]
})
export class FeedModule { }
