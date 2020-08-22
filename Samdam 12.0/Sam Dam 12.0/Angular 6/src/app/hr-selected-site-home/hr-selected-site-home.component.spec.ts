import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSelectedSiteHomeComponent } from './hr-selected-site-home.component';

describe('HrSelectedSiteHomeComponent', () => {
  let component: HrSelectedSiteHomeComponent;
  let fixture: ComponentFixture<HrSelectedSiteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSelectedSiteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSelectedSiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
