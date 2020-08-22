import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhHomeComponent } from './wh-home.component';

describe('WhHomeComponent', () => {
  let component: WhHomeComponent;
  let fixture: ComponentFixture<WhHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
