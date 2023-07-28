import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductSaleComponent } from './list-product-sale.component';

describe('ListProductSaleComponent', () => {
  let component: ListProductSaleComponent;
  let fixture: ComponentFixture<ListProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
