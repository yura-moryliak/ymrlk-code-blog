import {TestBed} from '@angular/core/testing';

import {YmrlkNotificationsService} from './ymrlk-notifications.service';
import {YmrlkToastComponent} from '../components/ymrlk-toast/ymrlk-toast.component';

describe('NotificationsService', () => {
  let service: YmrlkNotificationsService;

  beforeEach( async() => {
    service = TestBed.inject(YmrlkNotificationsService);
    TestBed.configureTestingModule({
      declarations: [ YmrlkToastComponent ]
    }).compileComponents().then( () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
      });
    });
  });
});
