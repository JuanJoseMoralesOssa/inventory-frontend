import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/client.model';
import { ConfigRoutesBackend } from '../config/config.routes.backend';
import { ProductModel } from '../models/product.model';
import { PackingModel } from '../models/packing.model';
import { BillModel } from '../models/bill.model';
import { RemissionModel } from '../models/remission.model';
import { SaleModel } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de clientes
   * @returns
   */
  listClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.urlBase}client`);
  }

  /**
   * Listado de productos
   * @returns
   */
  listProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.urlBase}product`);
  }

  /**
   * Listado de empaques
   * @returns
   */
  listPackings(): Observable<PackingModel[]> {
    return this.http.get<PackingModel[]>(`${this.urlBase}packing`);
  }

  /**
   * Listado de facturas
   * @returns
   */
  listBills(): Observable<BillModel[]> {
    return this.http.get<BillModel[]>(`${this.urlBase}bill`);
  }

  /**
   * Listado de remisiones
   * @returns
   */
  listRemissions(): Observable<RemissionModel[]> {
    return this.http.get<RemissionModel[]>(`${this.urlBase}remission`);
  }

  /**
   * Listado de ventas
   * @returns
   */
  listSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(`${this.urlBase}sale`);
  }

}
