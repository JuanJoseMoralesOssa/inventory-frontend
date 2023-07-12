import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackingComponent } from './edit-packing.component';

describe('EditPackingComponent', () => {
  let component: EditPackingComponent;
  let fixture: ComponentFixture<EditPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
