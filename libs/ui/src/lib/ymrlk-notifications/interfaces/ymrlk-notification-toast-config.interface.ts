/**
 * @module EccNotificationsModule
 */

import {YmrlkNotificationPositionEnum} from '../enum/ymrlk-notification-position.enum';
import {YmrlkNotificationTypeEnum} from '../enum/ymrlk-notification-type.enum';

export interface YmrlkNotificationToastConfigInterface {

  /**
   * Property provide duration time (in milliseconds), during which the notification modal will be displayed.
   */
  duration?: number;

  /**
   * Property set position (in viewport) to notification modal.
   * @see YmrlkNotificationPositionEnum
   */
  position?: YmrlkNotificationPositionEnum;

  /**
   * Property set type of notification.
   * @see YmrlkNotificationTypeEnum
   */
  notificationType?: YmrlkNotificationTypeEnum;

  /**
   * Property to check if hide modal on click is possible or not.
   */
  hideOnClick?: boolean;

  /**
   * Property sets modal behavior when user hover on modal.
   */
  keepOnHover?: boolean;

  /**
   * Property provide possibility to set custom icon to notification modal.
   */
  icon?: {
    src: string;
    alt: string;
  };

  /**
   * Property provide possibility to set some button in notification modal and call action method when this button was clicked.
   */
  actionButton?: {
    label: string;
    action?: () => void
  };

  /**
   * Property provide possibility to set close button with image on this button.
   */
  closeButton?: {
    image: {
      src: string;
      alt: string;
    }
  };

  /**
   * Property determines how many notification modals can be opened in the same time.
   */
  maxStackSize?: number;
}
