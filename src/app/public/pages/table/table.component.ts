import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { DataSourceProduct } from './data-source';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dataSourceProducts = new DataSourceProduct();
                      // muestra el id de rimero para cambiar el orden es aqui abajo
  columns: string[] = ['id', 'name', 'price', 'cover','actions'];
  total = 0;
  input = new FormControl('', {nonNullable: true})

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe(data => {
        this.dataSourceProducts.init(data);
        this.total = this.dataSourceProducts.getTotal();
      });

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceProducts.find(value);
      });
  }

  update(product: Product) {
    this.dataSourceProducts.update(product.id, { price: 20});
  }
}
