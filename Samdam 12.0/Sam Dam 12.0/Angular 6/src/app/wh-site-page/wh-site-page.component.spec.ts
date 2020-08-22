import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhSitePageComponent } from './wh-site-page.component';

describe('WhSitePageComponent', () => {
  let component: WhSitePageComponent;
  let fixture: ComponentFixture<WhSitePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhSitePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhSitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
