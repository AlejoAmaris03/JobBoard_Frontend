import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApplicationsMessage } from './no-applications-message';

describe('NoApplicationsMessage', () => {
  let component: NoApplicationsMessage;
  let fixture: ComponentFixture<NoApplicationsMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoApplicationsMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoApplicationsMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
