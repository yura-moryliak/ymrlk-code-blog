import {TestBed} from '@angular/core/testing';

import {YmrlkNotificationsDataService} from './ymrlk-notifications-data.service';

describe('NotificationsDataService', () => {
  let service: YmrlkNotificationsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YmrlkNotificationsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
