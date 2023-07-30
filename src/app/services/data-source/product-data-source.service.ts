import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceProduct } from 'src/app/data-sources/product-data-source';
import { ProductModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataSourceService {

  dataSourceProducts = new DataSourceProduct();
  load = false;
  init = false;
  error = false;
  products: ProductModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadProducts(): void{
    if (!this.load) {
      this.businessLogicService
        .getProductsSaleService()
        .listProductsSales()
        .subscribe({
          next: (productData) => {
            this.products = productData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initProducts(): void {
    if (!this.init) {
      this.dataSourceProducts.init(this.products);
      this.init = true;
    }
  }

  getDataSourceProduct(): DataSourceProduct{
    return this.dataSourceProducts;
  }

  getError(): boolean {
    return this.error
  }

}
