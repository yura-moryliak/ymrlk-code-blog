import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {YmrlkNotificationInterface} from '../interfaces/ymrlk-notification.interface';
import {YmrlkNotificationGroupInterface} from '../interfaces/ymrlk-notification-group.interface';
import {YmrlkNotificationModalInterface} from '../interfaces/ymrlk-notification-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class YmrlkNotificationsDataService {

  public get hasNotifications(): boolean {
    return !!this._notificationGroupsState.length;
  }

  public notificationGroups$: Observable<YmrlkNotificationGroupInterface[]>;

  public modalNotification$: Observable<YmrlkNotificationModalInterface>;

  private _notificationGroupsState: YmrlkNotificationGroupInterface[] = [];

  private _notificationGroups: BehaviorSubject<YmrlkNotificationGroupInterface[]> =
    new BehaviorSubject<YmrlkNotificationGroupInterface[]>(this._notificationGroupsState);

  private _modalNotificationState: YmrlkNotificationModalInterface = null;

  private _modalNotification: BehaviorSubject<YmrlkNotificationModalInterface> =
    new BehaviorSubject<YmrlkNotificationModalInterface>(this._modalNotificationState);

  constructor() {
    this.notificationGroups$ = this._notificationGroups.asObservable();
    this.modalNotification$ = this._modalNotification.asObservable();
  }

  public add(notification: YmrlkNotificationInterface): void {

    const groupByPosition = this._notificationGroupsState
      .find((group: YmrlkNotificationGroupInterface) => group.position === notification.config.position);

    if (this.checkIfExists(groupByPosition, notification)) {
      return;
    }

    if (!groupByPosition) {
      this._notificationGroupsState.push({
        position: notification.config.position,
        notifications: [notification]
      });
    } else {
      groupByPosition.notifications.push(notification);
    }

    this._notificationGroups.next(this._notificationGroupsState);
  }

  public addModal(modalNotification: YmrlkNotificationModalInterface): void {
    if (this._modalNotificationState) {
      return console.error(`You can't open more than one Notification Modal`);
    }

    this._modalNotificationState = modalNotification;
    this._modalNotification.next(this._modalNotificationState);
  }

  public removeModal(): void {
    this._modalNotificationState = null;
    this._modalNotification.next(this._modalNotificationState);
  }

  public remove(notification: any): void {

    const groupByPosition = this._notificationGroupsState
      .find((group: YmrlkNotificationGroupInterface) => group.position === notification.config.position);

    if (!groupByPosition) {
      console.error(`Notification that you have trying to remove doesn't apply to any of position groups`);
      return;
    }

    const notificationIndex = groupByPosition.notifications.indexOf(notification);
    groupByPosition.notifications.splice(notificationIndex, 1);

    if (!groupByPosition.notifications.length) {
      this._notificationGroupsState.splice(this._notificationGroupsState.indexOf(groupByPosition), 1);
    }

    this._notificationGroups.next(this._notificationGroupsState);
  }

  private checkIfExists(group: YmrlkNotificationGroupInterface, notification: YmrlkNotificationInterface): boolean {

    if (!group) {
      return false;
    }

    return !!group.notifications.find((notificationItem: YmrlkNotificationInterface) => {
      return notificationItem.message.title === notification.message.title && notificationItem.message.text === notification.message.text;
    });
  }
}
