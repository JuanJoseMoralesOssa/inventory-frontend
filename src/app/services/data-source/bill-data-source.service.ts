import { Injectable } from '@angular/core';
import { DataSourceBill } from 'src/app/data-sources/bill-data-source';
import { BillModel } from 'src/app/models/bill.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';

@Injectable({
  providedIn: 'root'
})
export class BillDataSourceService {

  dataSourceBills = new DataSourceBill();
  load = false;
  init = false;
  error = false;
  bills: BillModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadBills(): void{
    if (!this.load) {
      this.businessLogicService
        .getBillService()
        .listBills()
        .subscribe({
          next: (billData) => {
            this.bills = billData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initBills(): void {
    if (!this.init) {
      this.dataSourceBills.init(this.bills);
      this.init = true;
    }
  }

  getDataSourceBill(): DataSourceBill{
    return this.dataSourceBills;
  }

  getError(): boolean {
    return this.error;
  }

}
