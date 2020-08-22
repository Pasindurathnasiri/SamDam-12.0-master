import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoqRecordComponent } from './update-boq-record.component';

describe('UpdateBoqRecordComponent', () => {
  let component: UpdateBoqRecordComponent;
  let fixture: ComponentFixture<UpdateBoqRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBoqRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBoqRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
