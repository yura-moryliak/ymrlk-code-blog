import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { TranslateLoader } from '@ngx-translate/core';

import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { GlobalErrorInterceptor } from '../../interceptors/global-error.interceptor';
import { HttpLocalizationLoader } from '../../classes/http-localization-loader';

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

  static provideHttpLocalisationLoader(): Provider {
    return {
      provide: TranslateLoader,
      useFactory: HttpLocalizationLoader,
      deps: [HttpClient]
    }
  }

}
