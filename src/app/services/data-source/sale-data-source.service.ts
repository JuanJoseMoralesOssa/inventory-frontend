import { Injectable } from '@angular/core';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceSale } from 'src/app/data-sources/sale-data-source';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleDataSourceService {

  dataSourceSales = new DataSourceSale();
  sales: SaleModel[] = []
  private dataSubject$: BehaviorSubject<SaleModel[]> | undefined;


  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadSales(){
      this.businessLogicService
        .getSaleService()
        .listSalesWithRelations()
        .subscribe({
          next: (salesData) => {
            this.sales = salesData;
            this.initSales();
            this.dataSubject$ = this.getDataFromDataSource();
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultSales();
          }
        });
  }

  initSales(): void {
      this.dataSourceSales.init(this.sales);
  }

  getDataSourceSale(): DataSourceSale{
    return this.dataSourceSales;
  }

  getDataFromDataSource(): BehaviorSubject<SaleModel[]> {
    return this.dataSourceSales.data;
  }

  getSales(): Observable<SaleModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.sales.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getSaleService()
        .listSalesWithRelations().pipe(
        tap((salesData: SaleModel[]) => {
          this.sales = salesData; // Cache the fetched products
          this.dataSubject$!.next(salesData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultSales(): void {
    alert('Error al cargar las ventas');
    this.sales = [
      {
        id: 30,
        saleDate: '2023-07-30T15:25:44.000Z',
        remissionNum: { id: 1,remission: 2 },
        products: [{ id: 1, productName: 'lecosin' }, { id: 2, productName: 'Lecosin Kj' }],
        client: { id: 1, clientName: 'Perez Martinez' },
        remission: { id: 1, remission: 2 },
      },
      {
        id: 40,
        saleDate: '2023-07-30T15:25:44.000Z',
        remissionNum: { id: 1,remission: 3 },
        products: [{ id: 1, productName: 'Impecryl' }, { id: 2, productName: 'Acido Formico' }, { id: 3, productName: 'Formiato' }],
        client: { id: 1, clientName: 'Martinez Juarez' },
        bill: {id: 1, bill: 3}
      },
      {
        id: 50,
        saleDate: '2023-07-30T15:25:44.000Z',
        remissionNum: { id: 1,remission: 4 },
        products: [],
        client: { id: 1, clientName: 'Ana Suñiga' },
        bill: { id: 1, bill: 5 }
      },
    ]
    this.dataSourceSales.init(this.sales);
  }

}
