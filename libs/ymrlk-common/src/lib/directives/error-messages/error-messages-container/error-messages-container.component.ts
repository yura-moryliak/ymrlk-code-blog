import {
  Component, ViewEncapsulation, ChangeDetectionStrategy,
  Input, OnInit, OnDestroy, Output, EventEmitter
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ErrorMessageCallerInterface, ErrorMessageService } from '@ymrlk-code-blog/ymrlk-common';

@Component({
  selector: 'ymrlk-error-messages-container',
  templateUrl: './error-messages-container.component.html',
  styleUrls: ['./error-messages-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessagesContainerComponent implements OnInit, OnDestroy {

  @Input() label: string | undefined;
  @Input() ngControl: NgControl | undefined;

  @Output() closeErrorContainer: EventEmitter<void> = new EventEmitter<void>();

  errorsList: (string | undefined)[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private errorMessageService: ErrorMessageService) { }

  ngOnInit(): void {

    const errorMessagesSubscription = this.errorMessageService.errorMessages$.subscribe((errorMessages: ErrorMessageCallerInterface) => {
      this.errorsList = Object.keys(this.ngControl?.errors as object).map((key: string) => {

        if (!errorMessages[key]) {
          return;
        }

        return errorMessages[key](this.ngControl?.getError(key));
      });
    });

    this.subscriptions.add(errorMessagesSubscription);
  }

  close(): void {
    this.closeErrorContainer.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
