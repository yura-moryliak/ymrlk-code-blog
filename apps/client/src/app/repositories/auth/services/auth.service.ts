import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { PermanentStorageService } from '../../../services/permanent-storage.service';
import { AuthCredentialsInterface } from '../interfaces/auth-credentials.interface';
import { AuthTokensInterface } from '../interfaces/auth-tokens.interface'
import { AuthProfileCredentialsInterface } from '../interfaces/auth-profile-credentials.interface';

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_UUID } from '../../../constants/tokens.const';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private permanentStorageService: PermanentStorageService
  ) { }

  login(authCredentials: AuthCredentialsInterface): Observable<boolean> {
    return this.httpClient.post<AuthTokensInterface>(`${ environment.server.baseUrl }/auth/login`, authCredentials, { withCredentials: true }).pipe(
      switchMap((tokens: AuthTokensInterface) => {
        this.doLogin(tokens);
        return this.getCurrentUserUUID();
    }))
  }

  refreshToken(): Observable<AuthTokensInterface> {
    return this.httpClient.post<AuthTokensInterface>(`${ environment.server.baseUrl }/auth/refresh`, {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap((tokens: AuthTokensInterface) => this.storeTokens(tokens)),
      catchError((error) => {
        this.doLogoutUser();
        return throwError(error);
      })
    )
  }

  logout(): void {
    this.doLogoutUser();
  }

  getAccessToken(): string {
    return <string>this.permanentStorageService.get(ACCESS_TOKEN);
  }

  private getCurrentUserUUID(): Observable<boolean> {
    return this.httpClient.get<AuthProfileCredentialsInterface>(`${ environment.server.baseUrl }/users/profile`).pipe(
      switchMap((profileCredentials: AuthProfileCredentialsInterface) => {

        this.permanentStorageService.set(USER_UUID, btoa(profileCredentials.sub));
        return of(true);
      })
    ).pipe(catchError((error) => {
      console.log('AuthService:Login->Profile:ERROR: ', error);
      return throwError(error);
    }));
  }

  private doLogin(tokens: AuthTokensInterface): void {
    this.isLoggedInSubject.next(true);
    this.storeTokens(tokens);
  }

  private doLogoutUser(): void {
    this.isLoggedInSubject.next(false);
    this.removeTokens();
    this.router.navigate(['/']).catch((error) => console.log('Logout error: ', error));
  }

  private getRefreshToken(): string {
    return this.cookieService.get(REFRESH_TOKEN);
  }

  private storeTokens(tokens: AuthTokensInterface): void {
    this.permanentStorageService.set(ACCESS_TOKEN, tokens.accessToken);
    this.cookieService.set(REFRESH_TOKEN, tokens.refreshToken, {
      expires: environment.tokens.refresh.expiresIn,
      path: environment.tokens.refresh.path,
      domain: environment.tokens.refresh.domain,
      secure: environment.tokens.refresh.httpOnly,
      sameSite: 'Strict'
    });
  }

  private removeTokens(): void {
    this.permanentStorageService.remove(ACCESS_TOKEN);
    this.permanentStorageService.remove(USER_UUID);
    this.cookieService.delete(REFRESH_TOKEN);
  }
}
