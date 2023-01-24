import { TestBed } from '@angular/core/testing';

import { TabButtonsService } from './tab-buttons.service';

describe('TabButtonsService', () => {
  let service: TabButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
