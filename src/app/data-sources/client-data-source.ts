import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, max } from 'rxjs';
import { ClientModel } from "../models/client.model";

export class DataSourceClient extends DataSource<ClientModel> {

  data: BehaviorSubject<ClientModel[]> = new BehaviorSubject<ClientModel[]>([]);
  originalData : ClientModel[] =  [];

  connect(): Observable<ClientModel[]>{
    return this.data
  }

  init(products: ClientModel[]) {
    this.originalData = products;
    this.data.next(products);
  }

  getTotal() {
    // const products = this.data.getValue();
    // return products
    //       .map(item => item.price)
    //       .reduce((price, total) => price + total, 0);
  }


  find(query: string) {

    const newClients = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.clientName?.toLocaleLowerCase()}}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newClients);

  }

  create(client: ClientModel) {
    const clients = this.data.getValue();
    if (clients.length > 0) {
      const maxValue = Math.max(...clients.map(clientElem => clientElem.id!));
      if (maxValue) {
        client.id = maxValue + 1;
      }
    } else {
      client.id = 1;
    }
    if (client.id) {
      client.sales = [];
      clients.push(client)
    }
    this.data.next(clients);
  }


  update(id: ClientModel['id'], changes:Partial<ClientModel>) {
    const clients = this.data.getValue();
    const clientIndex = clients.findIndex(item => item.id === id);
    if (clientIndex !== -1) {
      clients[clientIndex] = {
        ...clients[clientIndex],
        ...changes,
      }
      this.data.next(clients);
    }
  }

  delete(id: ClientModel['id']) {
    const clients = this.data.getValue();
    const clientIndex = clients.findIndex(item => item.id === id);
    if (clientIndex !== -1) {
      clients.splice(clientIndex, 1);
      this.data.next(clients);
    }
  }

  disconnect() {  }

}
