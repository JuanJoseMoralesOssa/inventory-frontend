import { TestBed } from '@angular/core/testing';

import { RemissionService } from './remission.service';

describe('RemissionService', () => {
  let service: RemissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
