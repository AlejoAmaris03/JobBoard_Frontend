import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oauth2Google } from './oauth2-google';

describe('Oauth2Google', () => {
  let component: Oauth2Google;
  let fixture: ComponentFixture<Oauth2Google>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oauth2Google]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oauth2Google);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
