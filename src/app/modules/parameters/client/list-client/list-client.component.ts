import { Component } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DataSourceClient } from 'src/app/data-sources/client-data-source';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { CreateClientComponent } from '../create-client/create-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { DeleteClientComponent } from '../delete-client/delete-client.component';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {

  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceClients = new DataSourceClient();
  clients: ClientModel[] = [];
  columns: string[] = ['id', 'clientName', 'sales', 'actions'];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  client: ClientModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceClients = this.dataSourceService.getClientsData().getDataSourceClient();
  }

  ngOnInit(): void {
    this.dataSourceService.getClientsData().loadClients();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceClients.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<ClientModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  update(client: ClientModel) {
    this.businessLogic.getClientService().updateClient(client).subscribe({
      next: () => {
        this.dataSourceClients.update(client.id, { clientName: client.clientName });
      },
      error: () => {
        alert('No se acutalizo el cliente')
        console.log('====================================');
        console.log('Error al acutalizar el cliente');
        console.log('====================================');
      }
    });
  }

  create(client: ClientModel) {
    this.businessLogic.getClientService().createClient(client).subscribe({
      next: () => {
        this.dataSourceClients.create( { id: client.id, clientName: client.clientName, sales: client.sales});
      },
      error: () => {
        alert('No se creo el cliente')
        console.log('====================================');
        console.log('Error al crear el cliente');
        console.log('====================================');
      }
    });
  }

  view(client: ClientModel) {

  }

  delete(id: number) {
    this.businessLogic.getClientService().deleteClient(id).subscribe({
      next: () => {
        this.dataSourceClients.delete(id);
      },
      error: () => {
        alert('No se borro el cliente, porfavor verifica que no se encuentre en una venta')
        console.log('====================================');
        console.log('Error al borrar el cliente');
        console.log('====================================');
      }
    });
  }

  getClientValue(client: ClientModel) {
    this.client = client;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateClientComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isClientModel(output)) {
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ClientModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditClientComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.client
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isClientModel(output)) {
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ClientModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteClientComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.client.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            if (this.client.id) {
              this.delete(this.client.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada ClientModel.');
          }
        });
        break;
    }
  }

  isClientModel(obj: any): obj is ClientModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'clientName' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
