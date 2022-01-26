import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { GlobalErrorInterceptor } from '../../interceptors/global-error.interceptor';

export class SharedProviders {

  static provideAuthInterceptor(): Provider {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  }

  static provideErrorHandlerInterceptor(): Provider {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass:GlobalErrorInterceptor,
      multi: true
    }
  }

}
