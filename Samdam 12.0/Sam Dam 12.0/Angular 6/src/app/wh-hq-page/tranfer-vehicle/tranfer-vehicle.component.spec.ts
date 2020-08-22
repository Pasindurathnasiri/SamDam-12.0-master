import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferVehicleComponent } from './tranfer-vehicle.component';

describe('TranferVehicleComponent', () => {
  let component: TranferVehicleComponent;
  let fixture: ComponentFixture<TranferVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranferVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
