import { HttpClient } from '@angular/common/http';

import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

export function HttpLocalizationLoader(http: HttpClient) {

  return new MultiTranslateHttpLoader(http, [
    // {prefix: './assets/localization/ecc/file-upload/', suffix: '.json?cb=' + cb},
  ]);

}
