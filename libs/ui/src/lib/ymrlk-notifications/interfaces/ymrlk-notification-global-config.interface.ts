/**
 * @module EccNotificationsModule
 */

import {YmrlkNotificationToastConfigInterface} from './ymrlk-notification-toast-config.interface';

export interface YmrlkNotificationGlobalConfigInterface {

  /**
   * Property sets the number of notification modals that can be shown simultaneously
   */
  maxStackSize: number;

  /**
   * Property to attach config data to notification modal - set duration, position, type etc.
   * @see YmrlkNotificationToastConfigInterface
   */
  toastConfig: YmrlkNotificationToastConfigInterface;
}
