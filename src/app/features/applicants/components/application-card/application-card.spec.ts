import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCard } from './application-card';

describe('ApplicationCard', () => {
  let component: ApplicationCard;
  let fixture: ComponentFixture<ApplicationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
