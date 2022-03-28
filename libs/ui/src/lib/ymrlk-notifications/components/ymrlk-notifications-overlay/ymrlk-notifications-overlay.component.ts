/**
 * @description EccNotificationsOverlayComponent represent component, that contain notification modal and notification (ecc-toast) and
 * overlay them.
 *
 * @module EccNotificationsModule
 */

import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationGroupInterface} from '../../interfaces/ymrlk-notification-group.interface';
import {YmrlkNotificationModalInterface} from '../../interfaces/ymrlk-notification-modal.interface';

@Component({
  selector: 'ecc-notifications-overlay',
  templateUrl: './ymrlk-notifications-overlay.component.html',
  styleUrls: ['./ymrlk-notifications-overlay.component.scss']
})
export class YmrlkNotificationsOverlayComponent implements OnInit {

  /**
   * Observable that contains group of ecc-notifications
   */
  public notificationsGroups$: Observable<YmrlkNotificationGroupInterface[]>;

  /**
   * Observable that contains notification modal window
   */
  public modalNotification$: Observable<YmrlkNotificationModalInterface>;

  constructor(private _dataService: YmrlkNotificationsDataService) {
  }

  /**
   * In ngOnInit lifecycle hook we take Observables from EccNotificationsDataService and save it in our internal Observables variables
   */
  public ngOnInit(): void {
    this.notificationsGroups$ = this._dataService.notificationGroups$;
    this.modalNotification$ = this._dataService.modalNotification$;
  }
}
