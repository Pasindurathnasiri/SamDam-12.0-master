import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbHomeComponent } from './eb-home.component';

describe('EbHomeComponent', () => {
  let component: EbHomeComponent;
  let fixture: ComponentFixture<EbHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
