import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesForm } from './companies-form';

describe('CompaniesForm', () => {
  let component: CompaniesForm;
  let fixture: ComponentFixture<CompaniesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
