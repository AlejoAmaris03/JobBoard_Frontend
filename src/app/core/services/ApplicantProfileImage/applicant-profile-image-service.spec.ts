import { TestBed } from '@angular/core/testing';

import { ApplicantProfileImageService } from './applicant-profile-image-service';

describe('ApplicantProfileImageService', () => {
  let service: ApplicantProfileImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantProfileImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
