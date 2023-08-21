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
    let newSale: SaleModel = {
      saleDate: data.saleDate,
      remissionNumId: data.remissionNumId,
      clientId: data.clientId,
    }
    if (data.billId) {
      newSale = {
        ...newSale,
        billId: data.billId,
      }
    } else if (data.remissionId) {
      newSale = {
        ...newSale,
        remissionId: data.remissionId,
      }
    }

    if (data.remissionNum?.remission) {
      newSale = {
        ...newSale,
        remissionNum: {
          ...data.remissionNum,
        }
      }
    }
    if (data.client?.clientName) {
      newSale = {
        ...newSale,
        client: {
          ...data.client,
        }
      }
    }
    if (data.bill?.bill) {
      newSale = {
        ...newSale,
        bill: {
          ...data.bill,
        }
      }
    } else if (data.remission?.remission) {
      newSale = {
        ...newSale,
        remission: {
          ...data.remission,
        }
      }
    }
    return this.http.post<SaleModel>(`${this.urlBase}sale-default`, newSale);
  }

  updateSale(data: SaleModel): Observable<SaleModel>{
    let newSale: SaleModel = {
      id: data.id,
      saleDate: data.saleDate,
      remissionNumId: data.remissionNumId,
      clientId: data.clientId,
    }
    if (data.billId) {
      newSale = {
        ...newSale,
        billId: data.billId,
      }
    } else if (data.remissionId) {
      newSale = {
        ...newSale,
        remissionId: data.remissionId,
      }
    }

    if (data.remissionNum?.remission) {
      newSale = {
        ...newSale,
        remissionNum: {
          ...data.remissionNum,
        }
      }
    }
    if (data.client?.clientName) {
      newSale = {
        ...newSale,
        client: {
          ...data.client,
        }
      }
    }
    if (data.bill?.bill) {
      newSale = {
        ...newSale,
        bill: {
          ...data.bill,
        }
      }
    } else if (data.remission?.remission) {
      newSale = {
        ...newSale,
        remission: {
          ...data.remission,
        }
      }
    }
    return this.http.put<SaleModel>(`${this.urlBase}sale-default/${data.id}`, newSale);
  }

  deleteSale(saleId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}sale/${saleId}`);
  }

}
