import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEquipmentComponent } from './transfer-equipment.component';

describe('TransferEquipmentComponent', () => {
  let component: TransferEquipmentComponent;
  let fixture: ComponentFixture<TransferEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
