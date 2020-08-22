import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaysheetComponent } from './view-paysheet.component';

describe('ViewPaysheetComponent', () => {
  let component: ViewPaysheetComponent;
  let fixture: ComponentFixture<ViewPaysheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaysheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaysheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
