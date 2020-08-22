import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHqPageComponent } from './hr-hq-page.component';

describe('HrHqPageComponent', () => {
  let component: HrHqPageComponent;
  let fixture: ComponentFixture<HrHqPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHqPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
