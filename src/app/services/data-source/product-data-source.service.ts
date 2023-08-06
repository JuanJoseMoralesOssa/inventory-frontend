import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceProduct } from 'src/app/data-sources/product-data-source';
import { ProductModel } from 'src/app/models/product.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataSourceService {

  dataSourceProducts = new DataSourceProduct();

  products: ProductModel[] = []
  private dataSubject$: BehaviorSubject<ProductModel[]> | undefined;

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadProducts(): void{
    this.businessLogicService
        .getProductService()
        .listProductsWithRelations()
        .subscribe({
          next: (productData) => {
            this.products = productData; // Cache the products on initialization
            this.initProducts();
            this.dataSubject$ = this.getDataFromDataSource();
            // this.dataSubject$.next(productData); // Emit the products using the BehaviorSubject
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultProducts();
          }
        });
  }

  initProducts(): void {
    this.dataSourceProducts.init(this.products);
  }

  getDataSourceProduct(): DataSourceProduct{
    return this.dataSourceProducts;
  }

  getDataFromDataSource(): BehaviorSubject<ProductModel[]> {
    return this.dataSourceProducts.data;
  }

  getProducts(): Observable<ProductModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.products.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getProductService()
        .listProductsWithRelations().pipe(
        tap((productData: ProductModel[]) => {
          this.products = productData; // Cache the fetched products
          this.dataSubject$!.next(productData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultProducts(): void{
    alert('Error al cargar los productos');
    this.products = [
      {
        id: 30,
        code: '001',
        productName: 'Manzana',
        totalWeight: 20,
        sales: [{ id: 1 }, {id:2}],
      },
      {
        id: 40,
        code: '001',
        productName: 'Manzana',        totalWeight: 20,
        sales: [ {id:2}],
      },
      {
        id: 50,
        code: '001',
        productName: 'Manzana',
        totalWeight: 20,
        sales: [],
      },
    ]
    this.dataSourceProducts.init(this.products);
  }

}
