import { Component } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DataSourceClient } from 'src/app/data-sources/client-data-source';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@angular/cdk/dialog';
import { CreateClientComponent } from '../create-client/create-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { DeleteClientComponent } from '../delete-client/delete-client.component';

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
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
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

  ngOnInit(): void {
    // this.getClientsData();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceClients.find(value);
      });
  }

  getClientsData(): void {
    this.businessLogicService.listClients().subscribe({
      next: (clientsData) => {
        this.clients = clientsData;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ngOnInit(): void {
  //   this.http.get<ClientModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  //   this.input.valueChanges
  //     .pipe(
  //       debounceTime(300)
  //     )
  //     .subscribe(value => {
  //       this.dataSourceProducts.find(value);
  //     });
  // }

  update(client: ClientModel) {
    this.dataSourceClients.update(client.id, { clientName: client.clientName });
  }

  create(client: ClientModel) {
    this.dataSourceClients.create( { id: client.id, clientName: client.clientName, sales: client.sales});
  }

  view(client: ClientModel) {

  }

  delete(id: number) {
    this.dataSourceClients.delete(id);
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            console.log('====================================');
            console.log(output, this.client.id);
            console.log('====================================');
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
    'clientName' in obj &&
    'sales' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
