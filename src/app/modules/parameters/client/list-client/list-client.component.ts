import { Component } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';

import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DataSourceClient } from 'src/app/data-sources/client-data-source';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {
  dataSourceClients = new DataSourceClient();
  clients: ClientModel[] = [];

  constructor(
    private businessLogicService: BusinessLogicService,
  ) {

  }

  ngOnInit(): void {
    // this.getClientsData();

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

                      // muestra el id de rimero para cambiar el orden es aqui abajo
  columns: string[] = ['id', 'name', 'price', 'cover','actions'];
  total = 0;
  input = new FormControl('', {nonNullable: true})

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

    this.dataSourceClients.update(client.id, { id: 20});
  }


}
