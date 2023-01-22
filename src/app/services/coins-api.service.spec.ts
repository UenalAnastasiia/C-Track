import { TestBed } from '@angular/core/testing';

import { CoinsAPIService } from './coins-api.service';

describe('CoinsAPIService', () => {
  let service: CoinsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
