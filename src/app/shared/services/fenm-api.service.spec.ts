import { TestBed } from '@angular/core/testing';

import { FenmAPIService } from './fenm-api.service';

describe('FenmAPIService', () => {
  let service: FenmAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FenmAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
