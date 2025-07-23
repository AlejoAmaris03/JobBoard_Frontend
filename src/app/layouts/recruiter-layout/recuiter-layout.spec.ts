import { ComponentFixture, TestBed } from '@angular/core/testing';

import RecuiterLayout from './recuiter-layout';

describe('RecuiterLayout', () => {
  let component: RecuiterLayout;
  let fixture: ComponentFixture<RecuiterLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuiterLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuiterLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
