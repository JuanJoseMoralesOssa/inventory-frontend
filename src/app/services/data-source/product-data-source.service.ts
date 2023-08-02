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
  load = false;
  init = false;

  products: ProductModel[] = []
  private dataSubject$: BehaviorSubject<ProductModel[]> | undefined;

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadProducts(): void{
    if (!this.load) {
      this.businessLogicService
        .getProductService()
        .listProducts()
        .subscribe({
          next: (productData) => {
            this.products = productData; // Cache the products on initialization
            this.initProducts();
            this.dataSubject$ = this.getDataFromDataSource();
            this.init = true;
            this.load = true;
            // this.dataSubject$.next(productData); // Emit the products using the BehaviorSubject
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultProducts();
          }
        });
    }
  }

  initProducts(): void {
    if (!this.init) {
      this.dataSourceProducts.init(this.products);
    }
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
        .listProducts().pipe(
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
        totalQuantity: 10,
        totalWeight: 20,
        packing: {packing:'hola'},
        sales: [{ id: 1 }, {id:2}],
      },
      {
        id: 40,
        code: '001',
        productName: 'Manzana',
        totalQuantity: 10,
        totalWeight: 20,
        packing: {},
        sales: [ {id:2}],
      },
      {
        id: 50,
        code: '001',
        productName: 'Manzana',
        totalQuantity: 10,
        totalWeight: 20,
        packing: {},
        sales: [],
      },
    ]
    this.dataSourceProducts.init(this.products);
  }

}
