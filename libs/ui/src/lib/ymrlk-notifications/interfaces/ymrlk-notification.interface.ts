/**
 * @module EccNotificationsModule
 */

import {Subject} from 'rxjs';

import {YmrlkNotificationToastConfigInterface} from './ymrlk-notification-toast-config.interface';
import {YmrlkNotificationContentInterface} from './ymrlk-notification-content.interface';

export interface YmrlkNotificationInterface {

  /**
   * Property to attach title and text to notification modal.
   * @see YmrlkNotificationContentInterface
   */
  message: YmrlkNotificationContentInterface;

  /**
   * Property to describe notification modal - set duration, position, type etc.
   * @see YmrlkNotificationToastConfigInterface
   */
  config: YmrlkNotificationToastConfigInterface;

  /**
   * Observable to check if notification modal was destroyed
   */
  destroy$: Subject<boolean>;
}
