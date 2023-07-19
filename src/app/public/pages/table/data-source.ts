import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from "src/app/models/product.model";

export class DataSourceProduct extends DataSource<ProductModel> {

  data = new BehaviorSubject<ProductModel[]>([]);
  originalData : ProductModel[] =  [];

  connect(): Observable<ProductModel[]>{
    return this.data
  }

  init(products: ProductModel[]) {
    this.originalData = products;
    this.data.next(products);
  }

  getTotal() {
    const products = this.data.getValue();
    return products
          .map(item => item.price)
          .reduce((price, total) => price + total, 0);
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
    const newProducts = this.originalData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    this.data.next(newProducts);
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