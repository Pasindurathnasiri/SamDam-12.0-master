import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSiteHomeComponent } from './accounting-site-home.component';

describe('AccountingSiteHomeComponent', () => {
  let component: AccountingSiteHomeComponent;
  let fixture: ComponentFixture<AccountingSiteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingSiteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
