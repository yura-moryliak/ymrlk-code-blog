import {
  Inject, Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {Subject} from 'rxjs';

import {YmrlkNotificationsOverlayComponent} from '../components/ymrlk-notifications-overlay/ymrlk-notifications-overlay.component';
import {YmrlkNotificationToastConfigInterface} from '../interfaces/ymrlk-notification-toast-config.interface';
import {YmrlkNotificationsDataService} from './ymrlk-notifications-data.service';
import {YmrlkNotificationInterface} from '../interfaces/ymrlk-notification.interface';
import {YmrlkNotificationPositionEnum} from '../enum/ymrlk-notification-position.enum';
import {YmrlkNotificationTypeEnum} from '../enum/ymrlk-notification-type.enum';
import {YmrlkNotificationContentInterface} from '../interfaces/ymrlk-notification-content.interface';
import {YmrlkNotificationGlobalConfigInterface} from '../interfaces/ymrlk-notification-global-config.interface';
import {YmrlkNotificationModalConfigInterface} from '../interfaces/ymrlk-notification-modal-config.interface';
import {YmrlkNotificationModalInterface} from '../interfaces/ymrlk-notification-modal.interface';
import {YmrlkNotificationModalContentInterface} from '../interfaces/ymrlk-notification-modal-content.interface';

import {YmrlkNotificationConfig} from '../tokens/ymrlk-notification-config.token';

@Injectable({
  providedIn: 'root'
})
export class YmrlkNotificationsService {

  public get overlayCreated(): boolean {
    return !!this._overlayInstance;
  }

  private _renderer: Renderer2;

  private _overlayInstance: ComponentRef<YmrlkNotificationsOverlayComponent>;

  private _document?: Document;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector,
    private _rendererFactory: RendererFactory2,
    private _dataService: YmrlkNotificationsDataService,
    @Inject(EccNotificationConfig) private _notificationConfig: YmrlkNotificationGlobalConfigInterface,
    @Inject(DOCUMENT) document?: any
  ) {
    this._document = document as Document;
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  public showNotification(
    message: YmrlkNotificationContentInterface,
    configuration?: YmrlkNotificationToastConfigInterface
  ): YmrlkNotificationInterface {
    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config = this.getConfig(configuration);
    const destroy$ = new Subject<boolean>();
    const notification: YmrlkNotificationInterface = {message, config, destroy$};

    this._dataService.add(notification);

    return notification;
  }

  /**
   * Method that responsible for show notification modals.
   *
   * @remarks Method check if overlay was created and attach this overlay to body. Also prepare all necessary data and add it to
   * notification modal.
   *
   * @param content - notification modal title, text, buttons etc.
   * @param configuration - modal configuration that contains possibility to make backdrop click outside the modal and check if close button
   * is allowed.
   *
   * @see YmrlkNotificationModalContentInterface
   * @see YmrlkNotificationModalConfigInterface
   * @see YmrlkNotificationModalInterface
   *
   * @returns modal notification.
   */
  public showNotificationModal(
    content: YmrlkNotificationModalContentInterface,
    configuration?: YmrlkNotificationModalConfigInterface): YmrlkNotificationModalInterface {

    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config: YmrlkNotificationModalConfigInterface = this.getModalNotificationConfig(configuration);
    const confirm$ = new Subject<boolean>();
    const modalNotification: YmrlkNotificationModalInterface = {content, config, confirm$};

    this._dataService.addModal(modalNotification);

    return modalNotification;
  }

  /**
   * Method to hide (destroy) ecc-notifications (ecc-toast).
   *
   * @param notification - all data that needed to show notification (title, text, duration, position etc.)
   * @see YmrlkNotificationInterface
   */
  public hideNotification(notification: YmrlkNotificationInterface): void {
    this._dataService.remove(notification);
    notification = null;
  }

  /**
   * Method to hide (destroy) notification modal.
   */
  public hideNotificationModal(): void {
    this._dataService.removeModal();
  }

  /**
   * Method for attaching overlay component to body.
   *
   * @remarks Method create dynamic overlay component and attach it to body.
   */
  private attachOverlay(): void {

    this._overlayInstance = this._componentFactoryResolver.resolveComponentFactory(YmrlkNotificationsOverlayComponent)
      .create(this._injector);

    this._applicationRef.attachView(this._overlayInstance.hostView);

    const domElement = (this._overlayInstance.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this._renderer.appendChild(this._document.body, domElement);
  }

  /**
   * Method to get modal configuration.
   *
   * @param config - modal config that contains possibility to make backdrop click, and provide close button on notification modal
   *
   * @see YmrlkNotificationModalConfigInterface
   */
  private getModalNotificationConfig = (config: YmrlkNotificationModalConfigInterface): YmrlkNotificationModalConfigInterface => ({
    backdropDismiss: !(config && config.hasOwnProperty('backdropDismiss') && config.backdropDismiss === false),
    closeButton:  !(config && config.hasOwnProperty('closeButton') && config.closeButton === false)
  })

  /**
   * Method to get notification (ecc-toast) config
   *
   * @param config - configuration object that contains ecc-toast duration, position etc.
   * @see YmrlkNotificationToastConfigInterface
   */
  private getConfig = (config: YmrlkNotificationToastConfigInterface): YmrlkNotificationToastConfigInterface => ({
    duration: (config && config.duration) || this._notificationConfig.toastConfig.duration || 6000,
    position: (config && config.position) || this._notificationConfig.toastConfig.position || YmrlkNotificationPositionEnum.Top,
    notificationType: (config && config.notificationType) ||
      this._notificationConfig.toastConfig.notificationType ||
      YmrlkNotificationTypeEnum.Info,
    icon: (config && config.icon) || this._notificationConfig.toastConfig.icon || null,
    closeButton: (config && config.closeButton) || this._notificationConfig.toastConfig.closeButton || null,
    actionButton: (config && config.actionButton) || this._notificationConfig.toastConfig.actionButton || null,
    keepOnHover: (config && config.keepOnHover) || this._notificationConfig.toastConfig.keepOnHover || false,
    maxStackSize: (config && config.maxStackSize) || this._notificationConfig.maxStackSize || Infinity,
    hideOnClick: (config && config.hideOnClick) || this._notificationConfig.toastConfig.hideOnClick || false,
  })
}
