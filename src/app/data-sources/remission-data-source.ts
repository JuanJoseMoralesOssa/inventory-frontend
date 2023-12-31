import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { RemissionModel } from "../models/remission.model";

export class DataSourceRemission extends DataSource<RemissionModel> {

  data: BehaviorSubject<RemissionModel[]> = new BehaviorSubject<RemissionModel[]>([]);
  originalData : RemissionModel[] =  [];

  connect(): Observable<RemissionModel[]>{
    return this.data
  }

  init(remissions: RemissionModel[]) {
    this.originalData = remissions;
    this.data.next(remissions);
  }

  getTotal() {
    // const products = this.data.getValue();
    // return products
    //       .map(item => item.price)
    //       .reduce((price, total) => price + total, 0);
  }

  find(query: string) {
    const newRemissions = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.remission}}`;
      return word.includes(query)
    });
    this.data.next(newRemissions);

  }

  create(remission: RemissionModel) {
    const remissions = this.data.getValue();
    if (remissions.length > 0) {
      const maxValue = Math.max(...remissions.map(remissionElem => remissionElem.id!));
      if (maxValue) {
        remission.id = maxValue + 1;
      }
    } else {
      remission.id = 1;
    }
    if (remission.id) {
      remission.sale = {};
      remissions.push(remission)
    }
    this.data.next(remissions);
  }

  delete(id: RemissionModel['id']) {
    const remissions = this.data.getValue();
    const remissionIndex = remissions.findIndex(item => item.id === id);
    if (remissionIndex !== -1) {
      remissions.splice(remissionIndex, 1);
      this.data.next(remissions);
    }
  }

  update(id: RemissionModel['id'], changes:Partial<RemissionModel>) {
    const products = this.data.getValue();
    const productIndex = products.findIndex(item => item.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      }
      this.data.next(products);
    }
  }

  disconnect() {  }

}
