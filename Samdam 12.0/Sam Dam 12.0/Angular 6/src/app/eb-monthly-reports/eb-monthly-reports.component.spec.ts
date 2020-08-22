import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbMonthlyReportsComponent } from './eb-monthly-reports.component';

describe('EbMonthlyReportsComponent', () => {
  let component: EbMonthlyReportsComponent;
  let fixture: ComponentFixture<EbMonthlyReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbMonthlyReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbMonthlyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
