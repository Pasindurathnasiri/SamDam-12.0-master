import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEqHqComponent } from './add-eq-hq.component';

describe('AddEqHqComponent', () => {
  let component: AddEqHqComponent;
  let fixture: ComponentFixture<AddEqHqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEqHqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEqHqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
