import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSelectedSiteAttendanceComponent } from './hr-selected-site-attendance.component';

describe('HrSelectedSiteAttendanceComponent', () => {
  let component: HrSelectedSiteAttendanceComponent;
  let fixture: ComponentFixture<HrSelectedSiteAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSelectedSiteAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSelectedSiteAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
