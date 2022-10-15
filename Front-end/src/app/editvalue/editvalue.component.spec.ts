import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvalueComponent } from './editvalue.component';

describe('EditvalueComponent', () => {
  let component: EditvalueComponent;
  let fixture: ComponentFixture<EditvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditvalueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
