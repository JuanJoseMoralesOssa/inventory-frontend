import { TestBed } from '@angular/core/testing';

import { ProductDataSourceService } from './product-data-source.service';

describe('ProductDataSourceService', () => {
  let service: ProductDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
