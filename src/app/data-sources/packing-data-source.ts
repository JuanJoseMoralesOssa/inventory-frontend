import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { PackingModel } from "../models/packing.model";

export class DataSourcePacking extends DataSource<PackingModel> {

  data: BehaviorSubject<PackingModel[]> = new BehaviorSubject<PackingModel[]>([]);
  originalData : PackingModel[] =  [];

  connect(): Observable<PackingModel[]>{
    return this.data
  }

  init(packings: PackingModel[]) {
    this.originalData = packings;
    this.data.next(packings);
  }

  getTotal() {
    // const products = this.data.getValue();
    // return products
    //       .map(item => item.price)
    //       .reduce((price, total) => price + total, 0);
  }
  
  find(query: string) {

    const newPackings = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.packing?.toLocaleLowerCase()}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newPackings);
  }

  create(packing: PackingModel) {
    const packings = this.data.getValue();
    if (packings.length > 0) {
      const maxValue = Math.max(...packings.map(packingElem => packingElem.id!));
      if (maxValue) {
        packing.id = maxValue + 1;
      }
    } else {
      packing.id = 1;
    }
    if (packing.id) {
      packing.products = [];
      packings.push(packing)
    }
    this.data.next(packings);
  }

  delete(id: PackingModel['id']) {
    const packings = this.data.getValue();
    const packingIndex = packings.findIndex(item => item.id === id);
    if (packingIndex !== -1) {
      packings.splice(packingIndex, 1);
      this.data.next(packings);
    }
  }

  update(id: PackingModel['id'], changes:Partial<PackingModel>) {
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
