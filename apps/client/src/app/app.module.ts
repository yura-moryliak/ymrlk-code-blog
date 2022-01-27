import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { UiModule } from '@ymrlk-code-blog/ui';

import { SharedProviders } from './shared/providers/shared-providers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      RouterModule,
      SharedModule,

      // Custom
      UiModule
    ],
  providers: [
    SharedProviders.provideAuthInterceptor(),
    SharedProviders.provideErrorHandlerInterceptor()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
