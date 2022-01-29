import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let component: TagComponent;

  beforeEach(async () => {
    component = await new TagComponent();
  });

  it ('component has to be created and be truthy', async () => {
    await expect(component).toBeTruthy();
  });

  it ('property name initially should be empty string', async () => {
    await expect(component.name).toEqual('');
  });

  it ('property name after assignment should be Angular', async () => {
    component.name = 'Angular';
    await expect(component.name).toEqual('Angular');
  });
});
