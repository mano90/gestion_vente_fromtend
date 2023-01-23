import { TestBed } from '@angular/core/testing';

import { PerimeService } from './perime.service';

describe('PerimeService', () => {
  let service: PerimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
