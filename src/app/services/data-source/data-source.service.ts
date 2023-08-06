import { Injectable } from '@angular/core';
import { SaleDataSourceService } from './sale-data-source.service';
import { ProductDataSourceService } from './product-data-source.service';
import { ClientDataSourceService } from './client-data-source.service';
import { BillDataSourceService } from './bill-data-source.service';
import { RemissionDataSourceService } from './remission-data-source.service';
import { ProductSaleDataSourceService } from './product-sale-data-source.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(
    private saleDataSourceService: SaleDataSourceService,
    private productDataSourceService: ProductDataSourceService,
    private clientDataSourceService: ClientDataSourceService,
    private billDataSourceService: BillDataSourceService,
    private remissionDataSourceService: RemissionDataSourceService,
    private productSaleDataSourceService: ProductSaleDataSourceService,
  ) { }

  getSaleData(): SaleDataSourceService {
    return this.saleDataSourceService
  }

  getRemissionsData(): RemissionDataSourceService {
    return this.remissionDataSourceService
  }

  getProductsData(): ProductDataSourceService {
    return this.productDataSourceService
  }

  getClientsData(): ClientDataSourceService {
    return this.clientDataSourceService
  }

  getBillsData(): BillDataSourceService {
    return this.billDataSourceService
  }

  getProductsSaleData(): ProductSaleDataSourceService {
    return this.productSaleDataSourceService
  }
  
}
