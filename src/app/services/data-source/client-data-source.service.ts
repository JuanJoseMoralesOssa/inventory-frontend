import { Injectable } from '@angular/core';
import { DataSourceClient } from 'src/app/data-sources/client-data-source';
import { ClientModel } from 'src/app/models/client.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDataSourceService {

  dataSourceClients = new DataSourceClient();
  error = false;
  clients: ClientModel[] = []
  private dataSubject$: BehaviorSubject<ClientModel[]> | undefined;


  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadClients(): void{
      this.businessLogicService
        .getClientService()
        .listClientsWithRelations()
        .subscribe({
          next: (clientData) => {
            this.clients = clientData;
            this.initClients();
            this.dataSubject$ = this.getDataFromDataSource();
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultClients();
          }
        });
  }

  initClients(): void {
    this.dataSourceClients.init(this.clients);
  }

  getDataSourceClient(): DataSourceClient{
    return this.dataSourceClients;
  }

  getDataFromDataSource(): BehaviorSubject<ClientModel[]> {
    return this.dataSourceClients.data;
  }

  getProducts(): Observable<ClientModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.clients.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getClientService()
        .listClientsWithRelations().pipe(
        tap((clientData: ClientModel[]) => {
          this.clients = clientData; // Cache the fetched products
          this.dataSubject$!.next(clientData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultClients(): void {
      alert('Error al cargar los empaques');

    this.clients = [
      {
        id: 30,
        clientName: 'Juana',
        sales: [{ id: 1 }, {id:2}],
      },
      {
        id: 40,
        clientName: 'Maria',
        sales: [ {id:2}],
      },
      {
        id: 50,
        clientName: 'Pepe',
        sales: [],
      },
    ]
    this.dataSourceClients.init(this.clients);
  }

}
