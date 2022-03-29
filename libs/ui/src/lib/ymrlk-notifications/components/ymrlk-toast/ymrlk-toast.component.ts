import {Component, HostListener, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';

import {of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationInterface} from '../../interfaces/ymrlk-notification.interface';

@Component({
  selector: 'ymrlk-toast',
  templateUrl: './ymrlk-toast.component.html',
  styleUrls: ['./ymrlk-toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YmrlkToastComponent implements OnInit, OnDestroy {

  @Input() public notification: YmrlkNotificationInterface | undefined;

  private timerSubscription = new Subscription();

  private animateSubscription = new Subscription();

  constructor(
    private dataService: YmrlkNotificationsDataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    this.startTimer();
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    if (this.notification?.config?.keepOnHover) {
      this.timerSubscription.unsubscribe();
    }
  }

  @HostListener('mouseleave')
  public mouseLeave(): void {
    if (this.notification?.config?.keepOnHover) {
      this.startTimer();
    }
  }

  @HostListener('click')
  public hideOnClick(): void {
    if (this.notification?.config?.hideOnClick) {
      this.close();
    }
  }

  public close(): void {

    this.renderer.addClass(this.el.nativeElement, 'ymrlk-notification-toast-destroy');

    this.animateSubscription = of(true).pipe(
      delay(500)
    ).subscribe(() => this.dataService.remove(this.notification));
  }

  public toastActionButton(notification: YmrlkNotificationInterface | undefined) {
    if (notification?.config?.actionButton?.action) {
      notification.config.actionButton.action();
    }
  }

  public ngOnDestroy(): void {
    this.notification?.destroy$.next(true);
    this.timerSubscription.unsubscribe();
    this.animateSubscription.unsubscribe();
  }

  private startTimer(): void {

    if (!this.notification?.config?.duration) {
      return;
    }

    this.timerSubscription = of(true).pipe(
      delay(this.notification.config.duration)
    ).subscribe(() => this.close());
  }
}
