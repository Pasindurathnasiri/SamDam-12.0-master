import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSelectedSiteAdvanceComponent } from './hr-selected-site-advance.component';

describe('HrSelectedSiteAdvanceComponent', () => {
  let component: HrSelectedSiteAdvanceComponent;
  let fixture: ComponentFixture<HrSelectedSiteAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSelectedSiteAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSelectedSiteAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
