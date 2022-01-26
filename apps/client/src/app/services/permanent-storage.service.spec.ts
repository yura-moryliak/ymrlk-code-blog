import { TestBed } from '@angular/core/testing';

import { PermanentStorageService } from './permanent-storage.service';

describe('PermanentStorageService', () => {
  let service: PermanentStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermanentStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
