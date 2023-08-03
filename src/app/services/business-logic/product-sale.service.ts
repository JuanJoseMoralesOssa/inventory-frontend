import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { ProductSaleModel } from 'src/app/models/product-sale.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSaleService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de productos
   * @returns
   */
  listProductsSales(): Observable<ProductSaleModel[]> {
    return this.http.get<ProductSaleModel[]>(`${this.urlBase}product-sales`);
  }

  listProductsSalesWithRelations(): Observable<ProductSaleModel[]> {
    return this.http.get<ProductSaleModel[]>(`${this.urlBase}product-sales-relations`);
  }

  createProductSale(data: ProductSaleModel): Observable<ProductSaleModel>{
    return this.http.post<ProductSaleModel>(`${this.urlBase}product-sale`, data);
  }

  updateProductSale(data: ProductSaleModel): Observable<ProductSaleModel>{
    return this.http.put<ProductSaleModel>(`${this.urlBase}product-sale/${data.id}`, data);
  }

  deleteProductSale(productSaleId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}product-sale/${productSaleId}`);
  }

}
