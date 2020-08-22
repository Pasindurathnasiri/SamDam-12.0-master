import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingHomeComponent } from './accounting-home.component';

describe('AccountingHomeComponent', () => {
  let component: AccountingHomeComponent;
  let fixture: ComponentFixture<AccountingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
