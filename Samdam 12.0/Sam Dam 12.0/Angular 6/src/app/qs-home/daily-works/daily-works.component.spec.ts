import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWorksComponent } from './daily-works.component';

describe('DailyWorksComponent', () => {
  let component: DailyWorksComponent;
  let fixture: ComponentFixture<DailyWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
