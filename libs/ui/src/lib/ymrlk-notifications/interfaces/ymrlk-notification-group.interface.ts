/**
 * @module EccNotificationsModule
 */

import {YmrlkNotificationPositionEnum} from '../enum/ymrlk-notification-position.enum';
import {YmrlkNotificationInterface} from './ymrlk-notification.interface';

export interface YmrlkNotificationGroupInterface {

  /**
   * Property set position (in viewport) to notification modal
   * @see YmrlkNotificationPositionEnum
   */
  position: YmrlkNotificationPositionEnum;

  /**
   * Property contains all the necessary data for notification modal.
   * @see YmrlkNotificationInterface
   */
  notifications: YmrlkNotificationInterface[];
}
