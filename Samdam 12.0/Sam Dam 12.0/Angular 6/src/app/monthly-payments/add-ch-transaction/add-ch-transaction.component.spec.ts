import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChTransactionComponent } from './add-ch-transaction.component';

describe('AddChTransactionComponent', () => {
  let component: AddChTransactionComponent;
  let fixture: ComponentFixture<AddChTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
