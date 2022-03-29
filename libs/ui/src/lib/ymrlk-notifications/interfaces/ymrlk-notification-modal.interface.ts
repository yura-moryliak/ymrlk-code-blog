import {Subject} from 'rxjs';

import {YmrlkNotificationModalContentInterface} from './ymrlk-notification-modal-content.interface';
import {YmrlkNotificationModalConfigInterface} from './ymrlk-notification-modal-config.interface';

export interface YmrlkNotificationModalInterface {
  content: YmrlkNotificationModalContentInterface;

  config: YmrlkNotificationModalConfigInterface;

  confirm$: Subject<boolean | undefined>;
}
