import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDescriptionModal } from './profile-description-modal';

describe('ProfileDescriptionModal', () => {
  let component: ProfileDescriptionModal;
  let fixture: ComponentFixture<ProfileDescriptionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDescriptionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDescriptionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
