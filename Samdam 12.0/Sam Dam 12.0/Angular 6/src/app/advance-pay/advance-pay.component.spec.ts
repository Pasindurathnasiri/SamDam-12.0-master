import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePayComponent } from './advance-pay.component';

describe('AdvancePayComponent', () => {
  let component: AdvancePayComponent;
  let fixture: ComponentFixture<AdvancePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
