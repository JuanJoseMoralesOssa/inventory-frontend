import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { ProductModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de productos por venta
   * @returns
   */
  listProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.urlBase}product`);
  }

  listProductsWithRelations(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.urlBase}product-relations`);
  }

  createProduct(data: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(`${this.urlBase}product`, data);
  }

  updateProduct(data: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(`${this.urlBase}product/${data.id}`, data);
  }

  deleteProduct(productId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}product/${productId}`);
  }

}
