import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingSitesComponent } from './ongoing-sites.component';

describe('OngoingSitesComponent', () => {
  let component: OngoingSitesComponent;
  let fixture: ComponentFixture<OngoingSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
