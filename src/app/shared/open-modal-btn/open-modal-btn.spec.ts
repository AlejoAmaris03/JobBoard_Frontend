import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalBtn } from './open-modal-btn';

describe('OpenModalBtn', () => {
  let component: OpenModalBtn;
  let fixture: ComponentFixture<OpenModalBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenModalBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenModalBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
