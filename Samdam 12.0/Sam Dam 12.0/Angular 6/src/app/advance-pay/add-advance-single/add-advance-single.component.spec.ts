import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvanceSingleComponent } from './add-advance-single.component';

describe('AddAdvanceSingleComponent', () => {
  let component: AddAdvanceSingleComponent;
  let fixture: ComponentFixture<AddAdvanceSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdvanceSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvanceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
