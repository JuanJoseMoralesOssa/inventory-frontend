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

  listClientsWithRelations(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.urlBase}client-relations`);
  }

  createClient(data: ClientModel): Observable<ClientModel>{
    return this.http.post<ClientModel>(`${this.urlBase}client`, data);
  }

  updateClient(data: ClientModel): Observable<ClientModel>{
    return this.http.put<ClientModel>(`${this.urlBase}client/${data.id}`, data);
  }

  deleteClient(clientId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}client/${clientId}`);
  }

}
