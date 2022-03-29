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
    return !!this.overlayInstance;
  }

  private renderer: Renderer2;

  private overlayInstance: ComponentRef<YmrlkNotificationsOverlayComponent> | undefined;

  private document?: Document;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private dataService: YmrlkNotificationsDataService,
    @Inject(YmrlkNotificationConfig) private notificationConfig: YmrlkNotificationGlobalConfigInterface,
    @Inject(DOCUMENT) document?: any
  ) {
    this.document = document as Document;
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public showNotification(
    message: YmrlkNotificationContentInterface,
    configuration?: YmrlkNotificationToastConfigInterface | undefined
  ): YmrlkNotificationInterface {
    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config = this.getConfig(configuration);
    const destroy$ = new Subject<boolean>();
    const notification: YmrlkNotificationInterface = {message, config, destroy$};

    this.dataService.add(notification);

    return notification;
  }

  public showNotificationModal(
    content: YmrlkNotificationModalContentInterface,
    configuration?: YmrlkNotificationModalConfigInterface
  ): YmrlkNotificationModalInterface {

    if (!this.overlayCreated) {
      this.attachOverlay();
    }

    const config: YmrlkNotificationModalConfigInterface = this.getModalNotificationConfig(configuration);
    const confirm$ = new Subject<boolean>();
    const modalNotification: YmrlkNotificationModalInterface = {content, config, confirm$};

    this.dataService.addModal(modalNotification);

    return modalNotification;
  }

  public hideNotification(notification: YmrlkNotificationInterface | null): void {
    this.dataService.remove(notification);
    notification = null;
  }

  public hideNotificationModal(): void {
    this.dataService.removeModal();
  }

  private attachOverlay(): void {

    this.overlayInstance = this.componentFactoryResolver.resolveComponentFactory(YmrlkNotificationsOverlayComponent)
      .create(this.injector);

    this.applicationRef.attachView(this.overlayInstance.hostView);

    const domElement = (this.overlayInstance.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.renderer.appendChild(this.document?.body, domElement);
  }

  private getModalNotificationConfig = (config: YmrlkNotificationModalConfigInterface | undefined): YmrlkNotificationModalConfigInterface => ({
    // eslint-disable-next-line no-prototype-builtins
    backdropDismiss: !(config && config.hasOwnProperty('backdropDismiss') && config.backdropDismiss === false),
    // eslint-disable-next-line no-prototype-builtins
    closeButton:  !(config && config.hasOwnProperty('closeButton') && config.closeButton === false)
  })

  private getConfig = (config: YmrlkNotificationToastConfigInterface | undefined): YmrlkNotificationToastConfigInterface => ({
    duration: (config && config.duration) || this.notificationConfig.toastConfig.duration || 6000,
    position: (config && config.position) || this.notificationConfig.toastConfig.position || YmrlkNotificationPositionEnum.Top,
    notificationType: (config && config.notificationType) ||
      this.notificationConfig.toastConfig.notificationType ||
      YmrlkNotificationTypeEnum.Info,
    icon: (config && config.icon) || this.notificationConfig.toastConfig.icon || null,
    closeButton: (config && config.closeButton) || this.notificationConfig.toastConfig.closeButton || null,
    actionButton: (config && config.actionButton) || this.notificationConfig.toastConfig.actionButton || null,
    keepOnHover: (config && config.keepOnHover) || this.notificationConfig.toastConfig.keepOnHover || false,
    maxStackSize: (config && config.maxStackSize) || this.notificationConfig.maxStackSize || Infinity,
    hideOnClick: (config && config.hideOnClick) || this.notificationConfig.toastConfig.hideOnClick || false,
  })
}
