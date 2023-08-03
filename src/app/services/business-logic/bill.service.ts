import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { BillModel } from 'src/app/models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de facturas
   * @returns
   */
  listBills(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(`${this.urlBase}bill`);
  }

  listBillsWithRelations(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(`${this.urlBase}bill-relations`);
  }

  createBill(data: BillModel): Observable<BillModel>{
    return this.http.post<BillModel>(`${this.urlBase}bill`, data);
  }

  updateBill(data: BillModel): Observable<BillModel>{
    return this.http.put<BillModel>(`${this.urlBase}bill/${data.id}`, data);
  }

  deleteBill(billId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}bill/${billId}`);
  }
}
