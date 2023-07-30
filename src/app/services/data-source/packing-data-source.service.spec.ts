import { TestBed } from '@angular/core/testing';

import { PackingDataSourceService } from './packing-data-source.service';

describe('PackingDataSourceService', () => {
  let service: PackingDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
