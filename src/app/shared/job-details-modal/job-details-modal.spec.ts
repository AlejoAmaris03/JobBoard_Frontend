import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsModal } from './job-details-modal';

describe('JobDetailsModal', () => {
  let component: JobDetailsModal;
  let fixture: ComponentFixture<JobDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
