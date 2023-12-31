import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from "../models/product.model";

export class DataSourceProduct extends DataSource<ProductModel> {

  data: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  originalData: ProductModel[] = [];

  connect(): Observable<ProductModel[]>{
    return this.data
  }

  init(products: ProductModel[]) {
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

    const newProducts = this.originalData
    .filter(item => {
      const word = `${item.id}-${item.productName?.toLocaleLowerCase()}-${item.totalWeight}}`;
      return word.toLowerCase().includes(query.toLowerCase())
    });
    this.data.next(newProducts);

  }

    create(product: ProductModel) {
    const products = this.data.getValue();
    if (products.length > 0) {
      const maxValue = Math.max(...products.map(productElem => productElem.id!));
      if (maxValue) {
        product.id = maxValue + 1;
      }
    } else {
      product.id = 1;
    }
    if (product.id) {
      product.sales = [];
      products.push(product);
    }
    this.data.next(products);
  }

  delete(id: ProductModel['id']) {
    const products = this.data.getValue();
    const productIndex = products.findIndex(item => item.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.data.next(products);
    }
  }

  update(id: ProductModel['id'], changes:Partial<ProductModel>) {
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
