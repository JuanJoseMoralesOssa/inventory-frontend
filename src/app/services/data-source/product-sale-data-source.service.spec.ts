import { TestBed } from '@angular/core/testing';

import { ProductSaleDataSourceService } from './product-sale-data-source.service';

describe('ProductSaleDataSourceService', () => {
  let service: ProductSaleDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSaleDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
