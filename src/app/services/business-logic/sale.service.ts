import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { SaleModel } from 'src/app/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de ventas
   * @returns
   */
  listSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(`${this.urlBase}sale`);
  }

  listSalesWithRelations(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(`${this.urlBase}sale-relations`);
  }

  createSale(data: SaleModel): Observable<SaleModel>{
    let newSale: SaleModel;
    if (data.billId) {
      newSale = {
        saleDate: data.saleDate,
        billId: data.billId,
        clientId: data.clientId,
        remissionNumId: data.remissionNumId,
      }
    } else if (data.remissionId) {
      newSale = {
        saleDate: data.saleDate,
        remissionId: data.remissionId,
        clientId: data.clientId,
        remissionNumId: data.remissionNumId,
      }
    }
    return this.http.post<SaleModel>(`${this.urlBase}sale`, newSale!);
  }

  updateSale(data: SaleModel): Observable<SaleModel>{
    let newSale: SaleModel;
    if (data.billId) {
      newSale = {
        id: data.id,
        saleDate: data.saleDate,
        billId: data.billId,
        clientId: data.clientId,
        remissionNumId: data.remissionNumId,
      }
    } else if (data.remissionId){
      newSale = {
        id: data.id,
        saleDate: data.saleDate,
        remissionId: data.remissionId,
        clientId: data.clientId,
        remissionNumId: data.remissionNumId,
      }
    }
    return this.http.put<SaleModel>(`${this.urlBase}sale/${data.id}`, newSale!);
  }

  deleteSale(saleId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}sale/${saleId}`);
  }

}
