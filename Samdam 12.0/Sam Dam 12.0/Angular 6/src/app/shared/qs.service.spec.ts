import { TestBed } from '@angular/core/testing';

import { QsService } from './qs.service';

describe('QsService', () => {
  let service: QsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
