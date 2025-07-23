import { ComponentFixture, TestBed } from '@angular/core/testing';

import JobsApplied from './jobs-applied';

describe('JobsApplied', () => {
  let component: JobsApplied;
  let fixture: ComponentFixture<JobsApplied>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsApplied]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsApplied);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
