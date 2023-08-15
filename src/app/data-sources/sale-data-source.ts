import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { SaleModel } from "../models/sale.model";

export class DataSourceSale extends DataSource<SaleModel> {

  data: BehaviorSubject<SaleModel[]> = new BehaviorSubject<SaleModel[]>([]);
  originalData : SaleModel[] =  [];

  connect(): Observable<SaleModel[]>{
    return this.data
  }

  init(sales: SaleModel[]) {
    this.originalData = sales;
    this.data.next(sales);
  }

  getTotalWeigthSale(sale: SaleModel): Number {
    if (sale.productSales) {
      return sale.productSales
          .map(item => item.weight!)
          .reduce((weight, total) => weight + total, 0);
    }
    return 0
  }

  getTotal() {
    // const sales = this.data.getValue();
    // return sales
    //       .map(item => item.price)
    //       .reduce((price, total) => price + total, 0);
  }

  find(query: string) {

    const newSales = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.remissionNum?.remission}-${item.client?.clientName?.toLowerCase()}-${item.remission?.remission}-${item.bill?.bill}}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newSales);

    // const newSales = this.originalData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    // this.data.next(newSales);
  }

    create(sale: SaleModel) {
    const sales = this.data.getValue();
    if (sales.length > 0) {
      const maxValue = Math.max(...sales.map(saleElem => saleElem.id!));
      if (maxValue) {
        sale.id = maxValue + 1;
      }
    } else {
      sale.id = 1;
    }
      if (sale.id) {
      sales.push(sale)
    }
    this.data.next(sales);
  }

  delete(id: SaleModel['id']) {
    const sales = this.data.getValue();
    const saleIndex = sales.findIndex(item => item.id === id);
    if (saleIndex !== -1) {
      sales.splice(saleIndex, 1);
      this.data.next(sales);
    }
  }

  update(id: SaleModel['id'], changes:Partial<SaleModel>) {
    const sales = this.data.getValue();
    const saleIndex = sales.findIndex(item => item.id === id);
    if (saleIndex !== -1) {
      sales[saleIndex] = {
        ...sales[saleIndex],
        ...changes,
      }
      this.data.next(sales);
    }
  }

  disconnect() {  }

}
