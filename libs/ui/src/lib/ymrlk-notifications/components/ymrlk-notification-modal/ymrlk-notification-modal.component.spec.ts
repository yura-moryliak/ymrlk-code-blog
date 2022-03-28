import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YmrlkNotificationModalComponent} from './ymrlk-notification-modal.component';

describe('NotificationModalComponent', () => {
  let component: YmrlkNotificationModalComponent;
  let fixture: ComponentFixture<YmrlkNotificationModalComponent>;

  beforeEach( async() => {
    TestBed.configureTestingModule({
      declarations: [ YmrlkNotificationModalComponent ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(YmrlkNotificationModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
