import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInfoDateDialogComponent } from './mat-info-date-dialog.component';

describe('MatInfoDateDialogComponent', () => {
  let component: MatInfoDateDialogComponent;
  let fixture: ComponentFixture<MatInfoDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatInfoDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInfoDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
