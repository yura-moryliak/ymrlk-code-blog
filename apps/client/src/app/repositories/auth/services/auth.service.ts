import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedInSubject: BehaviorSubject<boolean>
    = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.httpClient.post(
      `${ environment.server.domain }/${ environment.server.apiPrefix }/auth/login`,
      credentials,
      { withCredentials: true }
    ).pipe(
      switchMap((tokens: any) => {

      if (!tokens) {
        return of(false);
      }

      this.cookieService.set('accessToken', tokens.accessToken);
      this.cookieService.set('refreshToken', tokens.refreshToken);

      return this.getCurrentUserUUID();
    }))
  }

  register(): Observable<null> {
    // TODO Provide register logic here...
    return of(null);
  }

  logout(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');

    this.router.navigate(['/']).catch((error) => console.log(error));
  }

  private getCurrentUserUUID(): Observable<boolean> {
    return this.httpClient.get(`${ environment.server.domain }/${ environment.server.apiPrefix }/users/profile`).pipe(
      switchMap((profileCredentials: any) => {

        this.cookieService.set('user-uuid', btoa(profileCredentials.sub))
        return of(true);
      })
    )
  }
}
