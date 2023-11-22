import { TestBed } from '@angular/core/testing';

import { SessionStorageManagerService } from './session-storage-manager.service';

describe('SessionStorageManagerService', () => {
  let service: SessionStorageManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
