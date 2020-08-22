import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAdvanceSingleComponent } from './confirm-advance-single.component';

describe('ConfirmAdvanceSingleComponent', () => {
  let component: ConfirmAdvanceSingleComponent;
  let fixture: ComponentFixture<ConfirmAdvanceSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAdvanceSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAdvanceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
