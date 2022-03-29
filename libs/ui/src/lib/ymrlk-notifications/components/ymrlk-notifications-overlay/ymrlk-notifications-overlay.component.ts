import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationGroupInterface} from '../../interfaces/ymrlk-notification-group.interface';
import {YmrlkNotificationModalInterface} from '../../interfaces/ymrlk-notification-modal.interface';

@Component({
  selector: 'ymrlk-notifications-overlay',
  templateUrl: './ymrlk-notifications-overlay.component.html',
  styleUrls: ['./ymrlk-notifications-overlay.component.scss']
})
export class YmrlkNotificationsOverlayComponent implements OnInit {

  public notificationsGroups$: Observable<YmrlkNotificationGroupInterface[]> | undefined;

  public modalNotification$: Observable<YmrlkNotificationModalInterface | null> | undefined;

  constructor(private _dataService: YmrlkNotificationsDataService) { }

  public ngOnInit(): void {
    this.notificationsGroups$ = this._dataService.notificationGroups$;
    this.modalNotification$ = this._dataService.modalNotification$;
  }
}
