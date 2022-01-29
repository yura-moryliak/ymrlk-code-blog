import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('component instance should be created', () => {
    expect(component).toBeTruthy();
  });

});
