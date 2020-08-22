import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaterialTypeComponent } from './update-material-type.component';

describe('UpdateMaterialTypeComponent', () => {
  let component: UpdateMaterialTypeComponent;
  let fixture: ComponentFixture<UpdateMaterialTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMaterialTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
