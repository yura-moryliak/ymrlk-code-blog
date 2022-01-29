import {
  ComponentRef, Directive, ElementRef,
  Input, OnDestroy, OnInit, Renderer2, ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ErrorMessagesContainerComponent } from './error-messages-container/error-messages-container.component';
import { ErrorMessageCallerInterface } from './interfaces/error-message-caller.interface';
import { ErrorMessageService } from './services/error-message.service';

@Directive({
  selector: '[ymrlkErrorMessages]'
})
export class ErrorMessagesDirective implements OnInit, OnDestroy {

  @Input('ymrlkErrorMessages') errorLabel = '';
  @Input() errorMessages: ErrorMessageCallerInterface | undefined;
  @Input() positionOffset = 0;

  private componentRef: ComponentRef<ErrorMessagesContainerComponent> | null = null;
  private subscription: Subscription = new Subscription();

  private get elementPosition() {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  constructor(
    private ngControl: NgControl,
    private elementRef: ElementRef,
    private vcr: ViewContainerRef,
    private renderer: Renderer2,
    private errorMessagesService: ErrorMessageService
  ) { }

  ngOnInit(): void {

    const statusChangesSubscription = this.ngControl.statusChanges?.subscribe((status: string) => {
      return status === 'INVALID' ? this.showError() : this.hideError();
    });

    this.subscription.add(statusChangesSubscription);
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
    this.componentRef.instance.ngControl = this.ngControl;

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
      this.componentRef?.location.nativeElement,
      'top',
      `-${ this.elementPosition.height + this.positionOffset }px`
    );
  }
}
