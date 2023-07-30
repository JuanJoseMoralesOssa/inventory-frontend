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
}
