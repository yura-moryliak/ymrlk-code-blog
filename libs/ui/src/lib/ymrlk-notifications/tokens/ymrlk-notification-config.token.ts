import {InjectionToken} from '@angular/core';

import {YmrlkNotificationGlobalConfigInterface} from '../interfaces/ymrlk-notification-global-config.interface';

export const YmrlkNotificationConfig = new InjectionToken<YmrlkNotificationGlobalConfigInterface>('YmrlkNotificationConfig');
