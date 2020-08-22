import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCashbookComponent } from './update-cashbook.component';

describe('UpdateCashbookComponent', () => {
  let component: UpdateCashbookComponent;
  let fixture: ComponentFixture<UpdateCashbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCashbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCashbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
