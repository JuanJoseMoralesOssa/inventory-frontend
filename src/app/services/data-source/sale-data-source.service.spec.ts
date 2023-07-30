import { TestBed } from '@angular/core/testing';

import { SaleDataSourceService } from './sale-data-source.service';

describe('SaleDataSourceService', () => {
  let service: SaleDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
