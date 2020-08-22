import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbSheduleSiteComponent } from './eb-shedule-site.component';

describe('EbSheduleSiteComponent', () => {
  let component: EbSheduleSiteComponent;
  let fixture: ComponentFixture<EbSheduleSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbSheduleSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbSheduleSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
