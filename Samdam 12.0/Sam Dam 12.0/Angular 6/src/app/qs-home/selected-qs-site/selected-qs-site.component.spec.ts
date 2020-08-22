import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedQsSiteComponent } from './selected-qs-site.component';

describe('SelectedQsSiteComponent', () => {
  let component: SelectedQsSiteComponent;
  let fixture: ComponentFixture<SelectedQsSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedQsSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedQsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
