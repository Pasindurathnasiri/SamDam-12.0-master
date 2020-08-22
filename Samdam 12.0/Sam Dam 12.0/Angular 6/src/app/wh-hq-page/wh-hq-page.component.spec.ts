import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhHqPageComponent } from './wh-hq-page.component';

describe('WhHqPageComponent', () => {
  let component: WhHqPageComponent;
  let fixture: ComponentFixture<WhHqPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhHqPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhHqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
