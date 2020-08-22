import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrHomeComponent } from './hr-home.component';

describe('HrHomeComponent', () => {
  let component: HrHomeComponent;
  let fixture: ComponentFixture<HrHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
