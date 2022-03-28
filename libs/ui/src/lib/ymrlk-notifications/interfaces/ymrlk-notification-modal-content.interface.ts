/**
 * @module EccNotificationsModule
 */

import {TemplateRef} from '@angular/core';

export interface YmrlkNotificationModalContentInterface {

  /**
   * Property provide title to notification modal.
   */
  title: string;

  /**
   * Property provide text to notification modal.
   */
  text?: string;

  /**
   * Property provide custom css-class to notification modal, to add possibility to provide custom styles.
   */
  panelClass?: string;

  /**
   * Property add possibility to provide html-template inside notification modal.
   */
  template?: TemplateRef<HTMLDivElement>;

  /**
   * Property to add text to close button in notification modal.
   */
  closeButtonText?: string;

  /**
   * Property to add text to confirm button in notification modal.
   */
  confirmButtonText?: string;
}
