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
    return !!this.notificationGroupsState.length;
  }

  public notificationGroups$: Observable<YmrlkNotificationGroupInterface[]>;

  public modalNotification$: Observable<YmrlkNotificationModalInterface | null>;

  private notificationGroupsState: YmrlkNotificationGroupInterface[] = [];

  private notificationGroups: BehaviorSubject<YmrlkNotificationGroupInterface[]> =
    new BehaviorSubject<YmrlkNotificationGroupInterface[]>(this.notificationGroupsState);

  private modalNotificationState: YmrlkNotificationModalInterface | null = null;

  private modalNotification: BehaviorSubject<YmrlkNotificationModalInterface | null> =
    new BehaviorSubject<YmrlkNotificationModalInterface | null>(this.modalNotificationState);

  constructor() {
    this.notificationGroups$ = this.notificationGroups.asObservable();
    this.modalNotification$ = this.modalNotification.asObservable();
  }

  public add(notification: YmrlkNotificationInterface): void {

    const groupByPosition = this.notificationGroupsState
      .find((group: YmrlkNotificationGroupInterface) => group.position === notification.config.position);

    if (this.checkIfExists(groupByPosition as YmrlkNotificationGroupInterface, notification)) {
      return;
    }

    if (!groupByPosition) {
      this.notificationGroupsState.push({
        position: notification.config.position,
        notifications: [notification]
      });
    } else {
      groupByPosition.notifications.push(notification);
    }

    this.notificationGroups.next(this.notificationGroupsState);
  }

  public addModal(modalNotification: YmrlkNotificationModalInterface): void {
    if (this.modalNotificationState) {
      return console.error(`You can't open more than one Notification Modal`);
    }

    this.modalNotificationState = modalNotification;
    this.modalNotification.next(this.modalNotificationState);
  }

  public removeModal(): void {
    this.modalNotificationState = null;
    this.modalNotification.next(this.modalNotificationState);
  }

  public remove(notification: any): void {

    const groupByPosition = this.notificationGroupsState
      .find((group: YmrlkNotificationGroupInterface) => group.position === notification.config.position);

    if (!groupByPosition) {
      console.error(`Notification that you have trying to remove doesn't apply to any of position groups`);
      return;
    }

    const notificationIndex = groupByPosition.notifications.indexOf(notification);
    groupByPosition.notifications.splice(notificationIndex, 1);

    if (!groupByPosition.notifications.length) {
      this.notificationGroupsState.splice(this.notificationGroupsState.indexOf(groupByPosition), 1);
    }

    this.notificationGroups.next(this.notificationGroupsState);
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
