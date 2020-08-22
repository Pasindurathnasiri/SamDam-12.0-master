import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSiteTaskComponent } from './update-site-task.component';

describe('UpdateSiteTaskComponent', () => {
  let component: UpdateSiteTaskComponent;
  let fixture: ComponentFixture<UpdateSiteTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSiteTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSiteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
