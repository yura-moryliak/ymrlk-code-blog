/**
 * @module EccNotificationsModule
 */

import {Subject} from 'rxjs';

import {YmrlkNotificationModalContentInterface} from './ymrlk-notification-modal-content.interface';
import {YmrlkNotificationModalConfigInterface} from './ymrlk-notification-modal-config.interface';

export interface YmrlkNotificationModalInterface {

  /**
   * Property attach some data to notification modal (such as title, text, custom css class, possibility to close modal with click on close
   * button etc.
   * @see YmrlkNotificationModalContentInterface
   */
  content: YmrlkNotificationModalContentInterface;

  /**
   * Property attach config data (with close buttons and modal position) to notification modal.
   * @see YmrlkNotificationModalContentInterface
   */
  config: YmrlkNotificationModalConfigInterface;

  /**
   * Observable to check if notification modal was confirmed or not.
   */
  confirm$: Subject<boolean>;
}
