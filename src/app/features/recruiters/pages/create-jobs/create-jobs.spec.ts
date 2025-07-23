import { ComponentFixture, TestBed } from '@angular/core/testing';

import CreateJobs from './create-jobs';

describe('CreateJobs', () => {
  let component: CreateJobs;
  let fixture: ComponentFixture<CreateJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJobs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
