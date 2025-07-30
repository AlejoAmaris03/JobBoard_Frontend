import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeModal } from './resume-modal';

describe('ResumeModal', () => {
  let component: ResumeModal;
  let fixture: ComponentFixture<ResumeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
