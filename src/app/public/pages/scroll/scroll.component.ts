import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../../models/product'

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.css']
})
export class ScrollComponent {

  products: Product[] = [];
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe(data => {
        this.products = data;
      })
  }
}
