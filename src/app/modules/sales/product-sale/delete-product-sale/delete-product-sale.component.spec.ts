import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductSaleComponent } from './delete-product-sale.component';

describe('DeleteProductSaleComponent', () => {
  let component: DeleteProductSaleComponent;
  let fixture: ComponentFixture<DeleteProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
