import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantModal } from './applicant-modal';

describe('ApplicantModal', () => {
  let component: ApplicantModal;
  let fixture: ComponentFixture<ApplicantModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
