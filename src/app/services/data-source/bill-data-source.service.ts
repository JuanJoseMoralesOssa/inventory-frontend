import { Injectable } from '@angular/core';
import { DataSourceBill } from 'src/app/data-sources/bill-data-source';
import { BillModel } from 'src/app/models/bill.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillDataSourceService {

  dataSourceBills = new DataSourceBill();
  load = false;
  init = false;
  bills: BillModel[] = []
  private dataSubject$: BehaviorSubject<BillModel[]> | undefined;


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
            this.initBills();
            this.dataSubject$ = this.getDataFromDataSource();
            this.init = true;
            this.load = true;
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultBills();
          }
        });
    }
  }

  initBills(): void {
    if (!this.init) {
      this.dataSourceBills.init(this.bills);
    }
  }

  getDataSourceBill(): DataSourceBill{
    return this.dataSourceBills;
  }

  getDataFromDataSource(): BehaviorSubject<BillModel[]> {
    return this.dataSourceBills.data;
  }

  getProducts(): Observable<BillModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.bills.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getClientService()
        .listClients().pipe(
        tap((billData: BillModel[]) => {
          this.bills = billData; // Cache the fetched products
          this.dataSubject$!.next(billData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultBills(): void{
    alert('Error al cargar las facturas');
    this.bills = [
      {
        id: 30,
        bill: 1,
        sale: { id: 1 },
      },
      {
        id: 40,
        bill: 2,
        sale: {id:2},
      },
      {
        id: 50,
        bill: 3,
        sale: {},
      },
    ]
    this.dataSourceBills.init(this.bills);
  }

}
