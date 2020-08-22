import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningChartComponent } from './running-chart.component';

describe('RunningChartComponent', () => {
  let component: RunningChartComponent;
  let fixture: ComponentFixture<RunningChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
