import { TestBed } from '@angular/core/testing';

import { BillDataSourceService } from './bill-data-source.service';

describe('BillDataSourceService', () => {
  let service: BillDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
