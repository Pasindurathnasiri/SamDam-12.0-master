import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSiteDetailsComponent } from './update-site-details.component';

describe('UpdateSiteDetailsComponent', () => {
  let component: UpdateSiteDetailsComponent;
  let fixture: ComponentFixture<UpdateSiteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSiteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
