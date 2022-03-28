import {NgModule, Optional, SkipSelf, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {YmrlkToastComponent} from './components/ymrlk-toast/ymrlk-toast.component';
import {YmrlkNotificationsOverlayComponent} from './components/ymrlk-notifications-overlay/ymrlk-notifications-overlay.component';

import {YmrlkNotificationGlobalConfigInterface} from './interfaces/ymrlk-notification-global-config.interface';
import {YmrlkNotificationModalComponent} from './components/ymrlk-notification-modal/ymrlk-notification-modal.component';

import {YmrlkNotificationConfig} from './tokens/ymrlk-notification-config.token';

@NgModule({
  declarations: [
    YmrlkToastComponent,
    YmrlkNotificationsOverlayComponent,
    YmrlkNotificationModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YmrlkToastComponent,
    YmrlkNotificationsOverlayComponent,
    YmrlkNotificationModalComponent
  ]
})
export class YmrlkNotificationsModule {

  constructor(@Optional() @SkipSelf() parentModule: YmrlkNotificationsModule) {
    if (parentModule) {
      throw new Error('NotificationModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: YmrlkNotificationGlobalConfigInterface): ModuleWithProviders<any> {
    return {
      ngModule: YmrlkNotificationsModule,
      providers: [{
        provide: YmrlkNotificationConfig,
        useValue: config
      }]
    };
  }
}
