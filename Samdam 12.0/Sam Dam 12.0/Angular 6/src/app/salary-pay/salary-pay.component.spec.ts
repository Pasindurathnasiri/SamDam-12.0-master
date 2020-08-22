import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPayComponent } from './salary-pay.component';

describe('SalaryPayComponent', () => {
  let component: SalaryPayComponent;
  let fixture: ComponentFixture<SalaryPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
