import { TestBed } from '@angular/core/testing';

import { ApplicantCvService } from './applicant-cv-service';

describe('ApplicantCvService', () => {
  let service: ApplicantCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
