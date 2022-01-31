import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {

  // TODO Inject here notificationService and translateService

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        switch (error.status) {

          case 401:
            break;

          case 500:
            break;

          case 0:
            this.getErrorNotification(
              'Network Error', // TODO add translations here
              'Please check network or firewall' // TODO add translations here
            );
            break;

          case 400:
            break;

          case 404:
            this.getErrorNotification(
              'Resource error', // TODO add translations here
              'Resource cannot be found', // TODO add translations here
            );
            break;

          default:
            this.getErrorNotification(
              'Undefined error', // TODO add translations here
              'An undefined error has occurred! Please try again' // TODO add translations here
            );
            break;

        }

        return throwError(error);
      })
    )
  }

  private getErrorNotification = (title: string, text: string): void => {
    // TODO Call notification here
    console.log(title, text);
  }
}
