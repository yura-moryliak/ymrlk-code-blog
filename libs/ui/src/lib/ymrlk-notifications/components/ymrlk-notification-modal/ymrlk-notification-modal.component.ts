import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationModalInterface} from '../../interfaces/ymrlk-notification-modal.interface';

@Component({
  selector: 'ymrlk-notification-modal',
  templateUrl: './ymrlk-notification-modal.component.html',
  styleUrls: ['./ymrlk-notification-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YmrlkNotificationModalComponent implements OnDestroy {

  @Input() public modalNotification: YmrlkNotificationModalInterface | undefined;

  private isConfirmed: boolean | undefined;

  constructor(private _notificationsDataService: YmrlkNotificationsDataService) { }

  public confirm(): void {
    this.isConfirmed = true;
    this._notificationsDataService.removeModal();
  }

  public dismiss(): void {
    this.isConfirmed = false;
    this._notificationsDataService.removeModal();
  }

  public backdropDismiss(): void {
    if (this.modalNotification?.config.backdropDismiss) {
      this.dismiss();
    }
  }

  public ngOnDestroy(): void {
    this.modalNotification?.confirm$.next(this.isConfirmed);
  }
}
