import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackingComponent } from './list-packing.component';

describe('ListPackingComponent', () => {
  let component: ListPackingComponent;
  let fixture: ComponentFixture<ListPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
