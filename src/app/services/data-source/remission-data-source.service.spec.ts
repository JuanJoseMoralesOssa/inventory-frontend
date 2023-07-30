import { TestBed } from '@angular/core/testing';

import { RemissionDataSourceService } from './remission-data-source.service';

describe('RemissionDataSourceService', () => {
  let service: RemissionDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemissionDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
