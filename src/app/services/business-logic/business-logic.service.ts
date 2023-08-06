import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { ProductService } from './product.service';
import { ProductSaleService } from './product-sale.service';
import { BillService } from './bill.service';
import { RemissionService } from './remission.service';
import { SaleService } from './sale.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private billService: BillService,
    private remissionService: RemissionService,
    private saleService: SaleService,
    private productSaleService: ProductSaleService,
  ) { }

  getClientService(): ClientService {
    return this.clientService
  }

  getProductService(): ProductService {
    return this.productService
  }

  getBillService(): BillService {
    return this.billService
  }

  getRemissionService(): RemissionService {
    return this.remissionService
  }

  getSaleService(): SaleService {
    return this.saleService
  }

  getProductsSaleService(): ProductSaleService {
    return this.productSaleService
  }

}
