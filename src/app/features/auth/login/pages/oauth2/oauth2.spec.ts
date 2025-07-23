import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2 } from './oauth2';

describe('OAuth2', () => {
  let component: OAuth2;
  let fixture: ComponentFixture<OAuth2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuth2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuth2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
