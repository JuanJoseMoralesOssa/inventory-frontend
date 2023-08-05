import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductSaleModel } from "../models/product-sale.model";


export class DataSourceProductSale extends DataSource<ProductSaleModel> {

  data: BehaviorSubject<ProductSaleModel[]> = new BehaviorSubject<ProductSaleModel[]>([]);
  originalData : ProductSaleModel[] =  [];

  connect(): Observable<ProductSaleModel[]>{
    return this.data
  }

  init(productSales: ProductSaleModel[]) {
    this.originalData = productSales;
    this.data.next(productSales);
  }

  getTotal() {
    // const productSales = this.data.getValue();
    // return productSales
    //       .map(item => item.price)
    //       .reduce((price, total) => price + total, 0);
  }


  find(query: string) {

    const newProductSales = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.saleId}-${item.product?.productName?.toLocaleLowerCase()}}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newProductSales);

  }

    create(productSale: ProductSaleModel) {
    const productSales = this.data.getValue();
    if (productSales.length > 0) {
      const maxValue = Math.max(...productSales.map(productSaleElem => productSaleElem.id!));
      if (maxValue) {
        productSale.id = maxValue + 1;
      }
    } else {
      productSale.id = 1;
    }
    if (productSale.id) {
      productSales.push(productSale);
    }
    this.data.next(productSales);
  }

  delete(id: ProductSaleModel['id']) {
    const productSales = this.data.getValue();
    const productSaleIndex = productSales.findIndex(item => item.id === id);
    if (productSaleIndex !== -1) {
      productSales.splice(productSaleIndex, 1);
      this.data.next(productSales);
    }
  }

  update(id: ProductSaleModel['id'], changes:Partial<ProductSaleModel>) {
    const productSales = this.data.getValue();
    const productSaleIndex = productSales.findIndex(item => item.id === id);
    if (productSaleIndex !== -1) {
      productSales[productSaleIndex] = {
        ...productSales[productSaleIndex],
        ...changes,
      }
      this.data.next(productSales);
    }
  }

  disconnect() {  }

}
