import { ComponentFixture, TestBed } from '@angular/core/testing';

import InProgressJobs from './in-progress-jobs';

describe('InProgressJobs', () => {
  let component: InProgressJobs;
  let fixture: ComponentFixture<InProgressJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InProgressJobs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressJobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
