import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhSiteManageComponent } from './wh-site-manage.component';

describe('WhSiteManageComponent', () => {
  let component: WhSiteManageComponent;
  let fixture: ComponentFixture<WhSiteManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhSiteManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhSiteManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
