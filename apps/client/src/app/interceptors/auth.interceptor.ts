import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthService } from '../repositories/auth/services/auth.service';
import { AuthTokensInterface } from '../repositories/auth/interfaces/auth-tokens.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken());
    }

    return next.handle(request).pipe(
      catchError((error) => {

        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorizedError(request, next);
        } else {
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<unknown>>;
  }

  private addToken = (request: HttpRequest<any>, token: string) => (
    request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  );

  private handleUnauthorizedError = (request: HttpRequest<unknown>, next: HttpHandler): Observable<unknown> => (this.isRefreshing ?
    this.updateCurrentRefresh(request, next) :
    this.initRefreshToken(request, next)
  );

  private initRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    this.refreshTokenSubject.next('');

    return this.authService.refreshToken().pipe(
      switchMap((tokens: AuthTokensInterface) => {

        this.isRefreshing = false;
        this.refreshTokenSubject.next(tokens.accessToken);

        return next.handle(this.addToken(request, tokens.accessToken));
      })
    );
  }

  private updateCurrentRefresh = (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> => (this.refreshTokenSubject.pipe(
    filter((token) => token != null),
    take(1),
    switchMap((jwt) => next.handle(this.addToken(request, jwt))))
  );
}
