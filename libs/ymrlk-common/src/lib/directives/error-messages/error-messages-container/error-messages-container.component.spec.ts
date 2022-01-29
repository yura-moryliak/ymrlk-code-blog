import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessagesContainerComponent } from './error-messages-container.component';

describe('ErrorMessagesContainerComponent', () => {
  let component: ErrorMessagesContainerComponent;
  let fixture: ComponentFixture<ErrorMessagesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorMessagesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
