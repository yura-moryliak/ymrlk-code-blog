/**
 * @description EccToastComponent is responsible for close (destroy) notification modal with smooth animation.
 *
 * @module EccNotificationsModule
 */

import {Component, HostListener, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';

import {of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

import {YmrlkNotificationsDataService} from '../../services/ymrlk-notifications-data.service';
import {YmrlkNotificationInterface} from '../../interfaces/ymrlk-notification.interface';

@Component({
  selector: 'ecc-toast',
  templateUrl: './ymrlk-toast.component.html',
  styleUrls: ['./ymrlk-toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YmrlkToastComponent implements OnInit, OnDestroy {

  /**
   * @Input notification set all necessary data for modal - such as title, text, position, duration etc.
   *
   * @see EccNotificationModalInterface
   */
  @Input() public notification: YmrlkNotificationInterface;

  /**
   * Subscription that start timer to show notification modal with some duration and unsubscribe from subscription when modal was destroyed.
   */
  private _timerSubscription = new Subscription();

  /**
   * Subscription to animate process of modal closing, and unsubscribe from subscription when modal was destroyed (closed).
   */
  private _animateSubscription = new Subscription();

  constructor(
    private _dataService: YmrlkNotificationsDataService,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
  }

  /**
   * Started timer to show notification with some duration
   */
  public ngOnInit(): void {
    this.startTimer();
  }

  /**
   * Watching the mouseenter event to unsubscribe from timer subscription when mouse hovered on modal.
   */
  @HostListener('mouseenter')
  public mouseEnter(): void {
    if (this.notification.config.keepOnHover) {
      this._timerSubscription.unsubscribe();
    }
  }

  /**
   * Watching the mouseleave event to start timer and when timer finished - modal will be closed (destroyed).
   */
  @HostListener('mouseleave')
  public mouseLeave(): void {
    if (this.notification.config.keepOnHover) {
      this.startTimer();
    }
  }

  /**
   * Watching the click event to close notification modal when hideOnClick property was allowed.
   */
  @HostListener('click')
  public hideOnClick(): void {
    if (this.notification.config.hideOnClick) {
      this.close();
    }
  }

  /**
   * Method to close notification modal. Added custom css-class to modal. This class is responsible to animate closing modal process - modal
   * will be closed smoothly, with some delay (500ms by default).
   */
  public close(): void {

    this._renderer.addClass(this._el.nativeElement, 'ecc-notification-ecc-toast-destroy');

    this._animateSubscription = of(true).pipe(
      delay(500)
    ).subscribe(() => this._dataService.remove(this.notification));
  }

  /**
   * When notification modal have action button - we can catch click on it and call action method.
   *
   * @param notification - data for notification modal (title, text, position, duration etc).
   * @see YmrlkNotificationInterface
   */
  public toastActionButton(notification: YmrlkNotificationInterface) {
    if (notification.config.actionButton.action) {
      notification.config.actionButton.action();
    }
  }

  /**
   * Place to unsubscribe from subscriptions, to prevent memory leaks.
   */
  public ngOnDestroy(): void {
    this.notification.destroy$.next(true);
    this._timerSubscription.unsubscribe();
    this._animateSubscription.unsubscribe();
  }

  /**
   * Method started timer to show notification with some duration and destroy (close) notification modal when duration was finished.
   */
  private startTimer(): void {

    if (!this.notification.config.duration) {
      return;
    }

    this._timerSubscription = of(true).pipe(
      delay(this.notification.config.duration)
    ).subscribe(() => this.close());
  }
}
