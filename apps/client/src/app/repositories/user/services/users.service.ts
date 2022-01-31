import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RegisterPayloadInterface } from '../../auth/interfaces/register-payload.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  register(registerPayload: RegisterPayloadInterface): Observable<boolean> {
    return this.httpClient.post<boolean>(`${ environment.server.baseUrl }/users/register`, registerPayload);
  }
}
