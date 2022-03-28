import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {YmrlkNotificationsOverlayComponent} from './ymrlk-notifications-overlay.component';

describe('NotificationsOverlayComponent', () => {
  let component: YmrlkNotificationsOverlayComponent;
  let fixture: ComponentFixture<YmrlkNotificationsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YmrlkNotificationsOverlayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YmrlkNotificationsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
