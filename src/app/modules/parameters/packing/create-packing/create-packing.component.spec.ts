import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackingComponent } from './create-packing.component';

describe('CreatePackingComponent', () => {
  let component: CreatePackingComponent;
  let fixture: ComponentFixture<CreatePackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
