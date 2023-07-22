import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { BillModel } from "../models/bill.model";

export class DataSourceBill extends DataSource<BillModel> {

  data = new BehaviorSubject<BillModel[]>([]);
  originalData : BillModel[] =  [];

  connect(): Observable<BillModel[]>{
    return this.data
  }

  init(products: BillModel[]) {
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

    /**
     *solucion

    const newProducts = this.originalData
     .filter(item => {
      const word = `${item.id}-${item.title}-${item.price}}`;
      return word.toLowerCase().includes(query.toLowerCase())
     });
    this.data.next(newProducts);

     *
     */




    // const newProducts = this.originalData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    // this.data.next(newProducts);
  }

  create(bill: BillModel) {
    const bills = this.data.getValue();
    if (bills.length > 0) {
      const maxValue = Math.max(...bills.map(billElem => billElem.id!));
      if (maxValue) {
        bill.id = maxValue + 1;
      }
    } else {
      bill.id = 1;
    }
    if (bill.id) {
      bill.sale = {};
      bills.push(bill)
    }
    this.data.next(bills);
  }

  delete(id: BillModel['id']) {
    const bills = this.data.getValue();
    const billIndex = bills.findIndex(item => item.id === id);
    if (billIndex !== -1) {
      bills.splice(billIndex, 1);
      this.data.next(bills);
    }
  }

  update(id: BillModel['id'], changes:Partial<BillModel>) {
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
