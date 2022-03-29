import {Subject} from 'rxjs';

import {YmrlkNotificationToastConfigInterface} from './ymrlk-notification-toast-config.interface';
import {YmrlkNotificationContentInterface} from './ymrlk-notification-content.interface';

export interface YmrlkNotificationInterface {
  message: YmrlkNotificationContentInterface;

  config: YmrlkNotificationToastConfigInterface | undefined;

  destroy$: Subject<boolean>;
}
