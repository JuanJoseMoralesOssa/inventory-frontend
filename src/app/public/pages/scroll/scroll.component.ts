import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductModel } from '../../../models/product.model'

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent {

  products: ProductModel[] = [];
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<ProductModel[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe(data => {
        this.products = data;
      })
  }
}
