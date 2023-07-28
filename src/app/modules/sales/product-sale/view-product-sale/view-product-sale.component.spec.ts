import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductSaleComponent } from './view-product-sale.component';

describe('ViewProductSaleComponent', () => {
  let component: ViewProductSaleComponent;
  let fixture: ComponentFixture<ViewProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
