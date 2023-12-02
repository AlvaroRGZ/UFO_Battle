import { TestBed } from '@angular/core/testing';

import { MissileControllerService } from './missile-controller.service';

describe('MissileControllerService', () => {
  let service: MissileControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissileControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
