import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsSiteCostsheetComponent } from './qs-site-costsheet.component';

describe('QsSiteCostsheetComponent', () => {
  let component: QsSiteCostsheetComponent;
  let fixture: ComponentFixture<QsSiteCostsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsSiteCostsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsSiteCostsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
