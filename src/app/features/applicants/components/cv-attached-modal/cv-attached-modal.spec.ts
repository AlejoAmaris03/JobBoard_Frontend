import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAttachedModal } from './cv-attached-modal';

describe('CvAttachedModal', () => {
  let component: CvAttachedModal;
  let fixture: ComponentFixture<CvAttachedModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvAttachedModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvAttachedModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
