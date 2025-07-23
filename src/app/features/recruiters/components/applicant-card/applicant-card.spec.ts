import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantCard } from './applicant-card';

describe('ApplicantCard', () => {
  let component: ApplicantCard;
  let fixture: ComponentFixture<ApplicantCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
