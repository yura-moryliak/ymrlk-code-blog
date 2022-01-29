import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

import { ErrorMessageCallerInterface } from '@ymrlk-code-blog/ymrlk-common';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  readonly errorMessages$: Observable<ErrorMessageCallerInterface>;

  private errorMessagesSubject: BehaviorSubject<ErrorMessageCallerInterface>
    = new BehaviorSubject<ErrorMessageCallerInterface>({});

  constructor() {
    this.errorMessages$ = this.errorMessagesSubject.asObservable().pipe(shareReplay())
  }

  setErrors(errors: ErrorMessageCallerInterface | undefined): void {
    if (!errors) {
      return;
    }

    this.errorMessagesSubject.next(errors);
  }
}
