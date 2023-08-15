import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faDollarSign, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceSale } from 'src/app/data-sources/sale-data-source';
import { SaleModel } from 'src/app/models/sale.model';
import { DeleteSaleComponent } from '../delete-sale/delete-sale.component';
import { EditSaleComponent } from '../edit-sale/edit-sale.component';
import { CreateSaleComponent } from '../create-sale/create-sale.component';
import { CreateProductSaleComponent } from '../../product-sale/create-product-sale/create-product-sale.component';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css']
})
export class ListSaleComponent {
  faDollarSign = faDollarSign;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceSales: DataSourceSale;
  sales: SaleModel[] = [];
  columns: string[] = ['id', 'saleDate', 'remissionNum', 'clientName', 'products', 'document', 'actions' ];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  sale: SaleModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceSales = this.dataSourceService.getSaleData().getDataSourceSale();
  }

  ngOnInit(): void {
    this.dataSourceService.getSaleData().loadSales();
    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        console.log('====================================');
        console.log(value);
        console.log('====================================');
        this.dataSourceSales.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<SaleModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  update(p_sale: SaleModel) {
    this.businessLogic.getSaleService().updateSale(p_sale).subscribe({
      next: () => {
        this.dataSourceSales.update(p_sale.id, { id: p_sale.id, saleDate: p_sale.saleDate, remissionNum: p_sale.remissionNum, client: p_sale.client, remission: p_sale?.remission, bill: p_sale?.bill });
      },
      error: () => {
        alert('No se actualizo la venta')
        console.log('====================================');
        console.log('Error al actualizar la venta');
        console.log('====================================');
      }
    });
  }

  create(p_sale: SaleModel) {
    this.businessLogic.getSaleService().createSale(p_sale).subscribe({
      next: () => {
        this.dataSourceSales.create({ id: p_sale.id, saleDate: p_sale.saleDate, remissionNum: p_sale.remissionNum, client: p_sale.client, remission: p_sale.remission, bill: p_sale.bill });
      },
      error: () => {
        alert('No se creo la venta')
        console.log('====================================');
        console.log('Error al crear la venta');
        console.log('====================================');
      }
    });
  }

  view(sale: SaleModel) {

  }

  delete(id: number) {
    this.businessLogic.getSaleService().deleteSale(id).subscribe({
      next: () => {
        this.dataSourceSales.delete(id);
      },
      error: () => {
        alert('No se borro la venta. Porfavor verifica que la venta no tenga productos por venta asociados')
        console.log('====================================');
        console.log('Error al borrar la venta');
        console.log('====================================');
      }
    });
  }

  createProductSale(product_sale: ProductSaleModel) {
    this.businessLogic.getProductsSaleService().createProductSale(product_sale).subscribe({
      next: () => {
        if (this.sale.productSales?.length) {
          this.sale.productSales.push({ weight: product_sale.weight, product: product_sale.product })
          this.dataSourceSales.update(this.sale.id, { products: this.sale.productSales});
        }
        this.sale.productSales = [ { weight: product_sale.weight, product: product_sale.product } ]
        this.dataSourceSales.update(this.sale.id, { products: this.sale.productSales});
      },
      error: () => {
        alert('No se agrego el producto a la venta')
        console.log('====================================');
        console.log('Error al agregar el producto a la venta');
        console.log('====================================');
      }
    });
  }

  getSaleValue(sale: SaleModel): void {
    this.sale = sale;
  }

  getTotalWeightSale(sale: SaleModel): Number {
    return this.dataSourceSales.getTotalWeigthSale(sale)
  }

  getDateFromString(dateString: string): Date {
    return new Date(dateString);
  }

  openCreateProductSale(): void {
    const dialogRefCreate = this.dialog.open(CreateProductSaleComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: this.sale.id,
    });
    dialogRefCreate.closed.subscribe(output => {
      if (this.isProductSaleModel(output)) {
            this.createProductSale(output);
        } else {
          console.error('Tipo de salida Invalida. Se esperada ProductSaleModel.');
        }
      });
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateSaleComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isSaleModel(output)) {
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada SaleModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditSaleComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.sale
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isSaleModel(output)) {
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada SaleModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteSaleComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.sale.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            if (this.sale.id) {
              this.delete(this.sale.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada SaleModel.');
          }
        });
        break;
    }
  }

  isSaleModel(obj: any): obj is SaleModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'saleDate' in obj &&
    'remissionNumId' in obj &&
    'clientId' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  isProductSaleModel(obj: any): obj is ProductSaleModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'saleId' in obj &&
    'productId' in obj &&
    'product' in obj &&
    'weight' in obj &&
    'isBorrowed' in obj
    );
  }

}
