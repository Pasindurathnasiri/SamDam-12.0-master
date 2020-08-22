import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMgmtComponent } from './employee-mgmt.component';

describe('EmployeeMgmtComponent', () => {
  let component: EmployeeMgmtComponent;
  let fixture: ComponentFixture<EmployeeMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
