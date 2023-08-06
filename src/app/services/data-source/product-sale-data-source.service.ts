import { Injectable } from '@angular/core';
import { DataSourceProductSale } from 'src/app/data-sources/product-sale-data-source';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSaleDataSourceService {

  dataSourceProductSales = new DataSourceProductSale();
  // load = false;
  // init = false;
  error = false;
  productSales: ProductSaleModel[] = []
  private dataSubject$: BehaviorSubject<ProductSaleModel[]> | undefined;


  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadProductsSales(): void{
    // if (!this.load) {
      this.businessLogicService
        .getProductsSaleService()
        .listProductsSalesWithRelations()
        .subscribe({
          next: (productSalesData) => {
            this.productSales = productSalesData;
            this.initProductSales();
            this.dataSubject$ = this.getDataFromDataSource();
            // this.init = true;
            // this.load = true;
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultProductsSales();
          }
        });
    // }
  }

  initProductSales(): void {
    // if (!this.init) {
      this.dataSourceProductSales.init(this.productSales);
    // }
  }

  getDataSourceProductSale(): DataSourceProductSale{
    return this.dataSourceProductSales;
  }

   getDataFromDataSource(): BehaviorSubject<ProductSaleModel[]> {
    return this.dataSourceProductSales.data;
  }

  getRemissions(): Observable<ProductSaleModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.productSales.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getProductsSaleService()
        .listProductsSalesWithRelations().pipe(
        tap((productSalesData: ProductSaleModel[]) => {
          this.productSales = productSalesData; // Cache the fetched products
          this.dataSubject$!.next(productSalesData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultProductsSales(): void {
    alert('Error al cargar los productos de las ventas');
    this.productSales = [
      {
        id: 30,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
        isBorrowed: true,
      },
      {
        id: 31,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
        isBorrowed: false,
      },
      {
        id: 32,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
      },
    ]
    this.dataSourceProductSales.init(this.productSales);
  }

}
