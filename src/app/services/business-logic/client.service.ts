import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { ClientModel } from 'src/app/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
}
