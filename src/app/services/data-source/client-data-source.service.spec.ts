import { TestBed } from '@angular/core/testing';

import { ClientDataSourceService } from './client-data-source.service';

describe('ClientDataSourceService', () => {
  let service: ClientDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
