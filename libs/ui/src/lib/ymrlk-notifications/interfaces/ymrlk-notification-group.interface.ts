import {YmrlkNotificationPositionEnum} from '../enum/ymrlk-notification-position.enum';
import {YmrlkNotificationInterface} from './ymrlk-notification.interface';

export interface YmrlkNotificationGroupInterface {
  position: YmrlkNotificationPositionEnum | undefined;

  notifications: YmrlkNotificationInterface[];
}
