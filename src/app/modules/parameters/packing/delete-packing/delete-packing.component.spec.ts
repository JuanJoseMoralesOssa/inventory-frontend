import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePackingComponent } from './delete-packing.component';

describe('DeletePackingComponent', () => {
  let component: DeletePackingComponent;
  let fixture: ComponentFixture<DeletePackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
