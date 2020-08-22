import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodescanComponent } from './qr-codescan.component';

describe('QrCodescanComponent', () => {
  let component: QrCodescanComponent;
  let fixture: ComponentFixture<QrCodescanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodescanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
