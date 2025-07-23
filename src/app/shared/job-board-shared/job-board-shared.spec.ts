import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardShared } from './job-board-shared';

describe('JobBoardShared', () => {
  let component: JobBoardShared;
  let fixture: ComponentFixture<JobBoardShared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBoardShared]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBoardShared);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
