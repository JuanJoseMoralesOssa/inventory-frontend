import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductSaleComponent } from './create-product-sale.component';

describe('CreateProductSaleComponent', () => {
  let component: CreateProductSaleComponent;
  let fixture: ComponentFixture<CreateProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
