import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSiteCashbookComponent } from './accounting-site-cashbook.component';

describe('AccountingSiteCashbookComponent', () => {
  let component: AccountingSiteCashbookComponent;
  let fixture: ComponentFixture<AccountingSiteCashbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingSiteCashbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSiteCashbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
