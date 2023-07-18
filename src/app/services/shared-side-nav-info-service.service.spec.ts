import { TestBed } from '@angular/core/testing';

import { SharedSideNavInfoServiceService } from './shared-side-nav-info-service.service';

describe('SharedSideNavInfoServiceService', () => {
  let service: SharedSideNavInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSideNavInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
