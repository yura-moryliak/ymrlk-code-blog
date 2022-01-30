import {
  ComponentRef, Directive, ElementRef, HostListener, Inject,
  Input, OnDestroy, OnInit, Renderer2, ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { Subscription } from 'rxjs';

import { ErrorMessagesContainerComponent } from './error-messages-container/error-messages-container.component';
import { ErrorMessageCallerInterface } from './interfaces/error-message-caller.interface';
import { ErrorMessageService } from './services/error-message.service';

@Directive({
  selector: '[ymrlkErrorMessages]'
})
export class ErrorMessagesDirective implements OnInit, OnDestroy {

  @Input() errorLabel: string | undefined;
  @Input() errorMessages: ErrorMessageCallerInterface | undefined;
  @Input() closable: boolean | undefined;
  @Input() closeOnBlur: boolean | undefined;
  @Input() set externalNgControl(ngControl: NgControl) {
    if (!ngControl) {
      return;
    }

    this.externalControl = ngControl;
  }

  private externalControl: NgControl | undefined;
  private componentRef: ComponentRef<ErrorMessagesContainerComponent> | null = null;
  private positionOffset = 5;

  private subscription: Subscription = new Subscription();

  private window: (WindowProxy & typeof globalThis) | null;

  private get elementPosition() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  constructor(
    private ngControl: NgControl,
    private elementRef: ElementRef,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private errorMessagesService: ErrorMessageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    this.checkContainerPositionType();
    this.initErrorStatus();
  }

  @HostListener('blur')
  blur(): void {
    if (this.componentRef && this.closeOnBlur) {
      this.hideError();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showError(): void {

    if (this.componentRef) {
      this.hideError();
    }

    this.componentRef = this.vcr.createComponent(ErrorMessagesContainerComponent);
    this.componentRef.instance.label = this.errorLabel;
    this.componentRef.instance.closable = this.closable;
    this.componentRef.instance.ngControl = this.externalControl ? this.externalControl : this.ngControl;

    this.setPosition();

    this.errorMessagesService.setErrors(this.errorMessages);

    const closeContainerSubscription = this.componentRef.instance.closeErrorContainer.subscribe(
      () => this.hideError()
    );

    this.subscription.add(closeContainerSubscription);
  }

  private hideError(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private setPosition(): void {
    this.renderer.setStyle(
      this.componentRef?.location.nativeElement, 'top', `${ this.elementPosition.height + this.positionOffset }px`
    );
  }

  private initErrorStatus(): void {

    const statusChanges$ = this.externalControl ? this.externalControl.statusChanges : this.ngControl.statusChanges;

    const statusChangesSubscription = statusChanges$?.subscribe((status) => {
      return status === 'INVALID' ? this.showError() : this.hideError();
    });

    this.subscription.add(statusChangesSubscription);
  }

  private checkContainerPositionType(): void {
    const positionValue = this.window?.getComputedStyle(
      this.renderer.parentNode(this.elementRef.nativeElement)
    ).getPropertyValue('position');

    if (positionValue !== 'relative') {
      throw new Error('Error message directive must be placed within relatively positioned block');
    }
  }
}
