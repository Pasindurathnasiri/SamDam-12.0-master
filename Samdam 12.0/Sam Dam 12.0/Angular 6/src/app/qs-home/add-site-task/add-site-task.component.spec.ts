import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteTaskComponent } from './add-site-task.component';

describe('AddSiteTaskComponent', () => {
  let component: AddSiteTaskComponent;
  let fixture: ComponentFixture<AddSiteTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSiteTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
