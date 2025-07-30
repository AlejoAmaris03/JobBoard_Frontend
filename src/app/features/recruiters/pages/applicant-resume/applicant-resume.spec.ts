import { ComponentFixture, TestBed } from '@angular/core/testing';

import ApplicantResume from './applicant-resume';

describe('ApplicantResume', () => {
  let component: ApplicantResume;
  let fixture: ComponentFixture<ApplicantResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantResume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
