import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSiteHomeComponent } from './hr-site-home.component';

describe('HrSiteHomeComponent', () => {
  let component: HrSiteHomeComponent;
  let fixture: ComponentFixture<HrSiteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSiteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
