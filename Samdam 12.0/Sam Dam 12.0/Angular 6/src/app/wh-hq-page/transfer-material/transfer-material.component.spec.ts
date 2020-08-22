import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMaterialComponent } from './transfer-material.component';

describe('TransferMaterialComponent', () => {
  let component: TransferMaterialComponent;
  let fixture: ComponentFixture<TransferMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
