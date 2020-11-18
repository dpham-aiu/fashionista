import { TestBed } from '@angular/core/testing';

import { UserPortalService } from './user-portal.service';

describe('UserPortalService', () => {
  let service: UserPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
