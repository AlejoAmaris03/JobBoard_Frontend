import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardCard } from './job-board-card';

describe('JobBoardCard', () => {
  let component: JobBoardCard;
  let fixture: ComponentFixture<JobBoardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBoardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBoardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
