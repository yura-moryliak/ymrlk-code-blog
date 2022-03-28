/**
 * @description EccNotificationModalComponent implement notification modal window and set modal data (such as title, text, or custom
 * html template). Also modal listening button click to check is modal window dismissed or confirmed. If backdrop click allowed - modal
 * can be closed by click outside the modal window.
 *
 * @module EccNotificationsModule
 */

import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationModalInterface} from '../../interfaces/ymrlk-notification-modal.interface';

@Component({
  selector: 'ecc-notification-modal',
  templateUrl: './ymrlk-notification-modal.component.html',
  styleUrls: ['./ymrlk-notification-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YmrlkNotificationModalComponent implements OnDestroy {

  /**
   * @Input modalNotification set all necessary data for modal - such as title, text, buttons, allow/forbid backdrop click etc.
   *
   * @see YmrlkNotificationModalInterface
   */
  @Input() public modalNotification: YmrlkNotificationModalInterface;

  /**
   * Property to check what button was clicked - confirm or dismiss.
   */
  private _isConfirmed: boolean;

  constructor(private _notificationsDataService: YmrlkNotificationsDataService) {
  }

  /**
   * Method is performed when confirm button clicked. Property isConfirmed will be set to true and modal window will be removed.
   */
  public confirm(): void {
    this._isConfirmed = true;
    this._notificationsDataService.removeModal();
  }

  /**
   * Method is performed when dismiss button clicked. Property isConfirmed will be set to false and modal window will be removed.
   */
  public dismiss(): void {
    this._isConfirmed = false;
    this._notificationsDataService.removeModal();
  }

  /**
   * Method check if backdrop click is allowed, and if allowed - remove modal window.
   */
  public backdropDismiss(): void {
    if (this.modalNotification.config.backdropDismiss) {
      this.dismiss();
    }
  }

  /**
   * When EccNotificationModalComponent will be destroyed - we send the result of pressing a button (isConfirmed property) in
   * confirm$ stream.
   */
  public ngOnDestroy(): void {
    this.modalNotification.confirm$.next(this._isConfirmed);
  }
}
