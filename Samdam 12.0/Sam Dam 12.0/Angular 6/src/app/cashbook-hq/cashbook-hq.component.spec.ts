import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookHqComponent } from './cashbook-hq.component';

describe('CashbookHqComponent', () => {
  let component: CashbookHqComponent;
  let fixture: ComponentFixture<CashbookHqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashbookHqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbookHqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
