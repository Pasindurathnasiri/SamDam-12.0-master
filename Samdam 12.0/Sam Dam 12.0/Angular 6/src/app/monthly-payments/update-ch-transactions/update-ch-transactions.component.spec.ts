import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChTransactionsComponent } from './update-ch-transactions.component';

describe('UpdateChTransactionsComponent', () => {
  let component: UpdateChTransactionsComponent;
  let fixture: ComponentFixture<UpdateChTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
