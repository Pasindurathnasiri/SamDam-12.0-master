import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsHomeComponent } from './qs-home.component';

describe('QsHomeComponent', () => {
  let component: QsHomeComponent;
  let fixture: ComponentFixture<QsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
