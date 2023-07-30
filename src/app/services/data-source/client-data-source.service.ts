import { Injectable } from '@angular/core';
import { DataSourceClient } from 'src/app/data-sources/client-data-source';
import { ClientModel } from 'src/app/models/client.model';
import { BusinessLogicService } from '../business-logic/business-logic.service';

@Injectable({
  providedIn: 'root'
})
export class ClientDataSourceService {

  dataSourceClients = new DataSourceClient();
  load = false;
  init = false;
  error = false;
  clients: ClientModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadClients(): void{
    if (!this.load) {
      this.businessLogicService
        .getClientService()
        .listClients()
        .subscribe({
          next: (clientData) => {
            this.clients = clientData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initClients(): void {
    if (!this.init) {
      this.dataSourceClients.init(this.clients);
      this.init = true;
    }
  }

  getDataSourceClient(): DataSourceClient{
    return this.dataSourceClients;
  }

  getError(): boolean {
    return this.error;
  }
}
