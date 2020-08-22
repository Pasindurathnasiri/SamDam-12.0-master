import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEmployeeComponent } from './transfer-employee.component';

describe('TransferEmployeeComponent', () => {
  let component: TransferEmployeeComponent;
  let fixture: ComponentFixture<TransferEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
