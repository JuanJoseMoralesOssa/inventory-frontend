import { Injectable } from '@angular/core';
import { ConfigRoutesBackend } from '../../config/config.routes.backend';
import { ClientService } from './client.service';
import { ProductService } from './product.service';
import { ProductSaleService } from './product-sale.service';
import { PackingService } from './packing.service';
import { BillService } from './bill.service';
import { RemissionService } from './remission.service';
import { SaleService } from './sale.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessLogicService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private packingService: PackingService,
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

  getPackingService(): PackingService {
    return this.packingService
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
