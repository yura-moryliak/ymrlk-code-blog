import {ComponentFixture, TestBed} from '@angular/core/testing';

import {YmrlkToastComponent} from './ymrlk-toast.component';

describe('YmrlkToastComponent', () => {
  let component: YmrlkToastComponent;
  let fixture: ComponentFixture<YmrlkToastComponent>;

  beforeEach( async() => {
    TestBed.configureTestingModule({
      declarations: [ YmrlkToastComponent ]
    }).compileComponents().then( () => {
      fixture = TestBed.createComponent(YmrlkToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
