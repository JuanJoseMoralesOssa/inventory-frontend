import { Injectable } from '@angular/core';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceSale } from 'src/app/data-sources/sale-data-source';

@Injectable({
  providedIn: 'root'
})
export class SaleDataSourceService {

  dataSourceSales = new DataSourceSale();
  load = false;
  init = false;
  error = false;
  sales: SaleModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadSales(): void{
    if (!this.load) {
      this.businessLogicService
        .getSaleService()
        .listSales()
        .subscribe({
          next: (salesData) => {
            this.sales = salesData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initSales(): void {
    if (!this.init) {
      this.dataSourceSales.init(this.sales);
      this.init = true;
    }
  }

  getDataSourceSale(): DataSourceSale{
    return this.dataSourceSales;
  }

  getError(): boolean {
    return this.error
  }

}
