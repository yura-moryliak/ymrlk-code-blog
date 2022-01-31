import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { UiModule } from '@ymrlk-code-blog/ui';
import { YmrlkCommonModule } from '@ymrlk-code-blog/ymrlk-common';

import { SharedProviders } from '../../shared/providers/shared-providers';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    UiModule,
    YmrlkCommonModule
  ],
  providers: [
    CookieService,
    SharedProviders.provideAuthInterceptor(),
    SharedProviders.provideErrorHandlerInterceptor()
  ]
})
export class AuthModule { }
