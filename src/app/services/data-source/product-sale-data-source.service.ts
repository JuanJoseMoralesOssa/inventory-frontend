import { Injectable } from '@angular/core';
import { DataSourceProductSale } from 'src/app/data-sources/product-sale-data-source';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSaleDataSourceService {

  dataSourceProductSales = new DataSourceProductSale();
  load = false;
  init = false;
  error = false;
  productSales: ProductSaleModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadProductsSales(): void{
    if (!this.load) {
      this.businessLogicService
        .getProductsSaleService()
        .listProductsSales()
        .subscribe({
          next: (productSalesData) => {
            this.productSales = productSalesData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initProductSales(): void {
    if (!this.init) {
      this.dataSourceProductSales.init(this.productSales);
      this.init = true;
    }
  }

  getDataSourceProductSale(): DataSourceProductSale{
    return this.dataSourceProductSales;
  }

  getError(): boolean {
    return this.error
  }
  
}
