import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { faEye, faFileInvoiceDollar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { CreateProductSaleComponent } from '../create-product-sale/create-product-sale.component';
import { EditProductSaleComponent } from '../edit-product-sale/edit-product-sale.component';
import { DeleteProductSaleComponent } from '../delete-product-sale/delete-product-sale.component';
import { DataSourceProductSale } from 'src/app/data-sources/product-sale-data-source';
import { FormControl } from '@angular/forms';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { debounceTime } from 'rxjs';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-product-sale',
  templateUrl: './list-product-sale.component.html',
  styleUrls: ['./list-product-sale.component.css']
})
export class ListProductSaleComponent {
  faFileInvoiceDollar = faFileInvoiceDollar;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceProductSales = new DataSourceProductSale();
  productSales: ProductSaleModel[] = [];
  columns: string[] = ['id','sale', 'product', 'weight', 'isBorrowed', 'actions' ];
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';
  input = new FormControl('', { nonNullable: true })

  productSale: ProductSaleModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceProductSales = this.dataSourceService.getProductsSaleData().getDataSourceProductSale();
  }

  ngOnInit(): void {
    this.dataSourceService.getProductsSaleData().loadProductsSales();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceProductSales.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<ProductSaleModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  update(p_productSale: ProductSaleModel) {
    this.businessLogic.getProductsSaleService().updateProductSale(p_productSale).subscribe({
      next: () => {
        this.dataSourceProductSales.update(p_productSale.id, { id: p_productSale.id, sale: p_productSale.sale, product: p_productSale.product, weight: p_productSale.weight, isBorrowed: p_productSale.isBorrowed });
      },
      error: () => {
        alert('No se actualizo el producto por venta')
        console.log('====================================');
        console.log('Error al actualizar el producto por venta');
        console.log('====================================');
      }
    });
  }

  create(p_productSale: ProductSaleModel) {
    this.businessLogic.getProductsSaleService().createProductSale(p_productSale).subscribe({
      next: () => {
        this.dataSourceProductSales.create( { id: p_productSale.id, sale: p_productSale.sale, product: p_productSale.product, weight: p_productSale.weight, isBorrowed: p_productSale.isBorrowed });
      },
      error: () => {
        alert('No se creo el producto por venta')
        console.log('====================================');
        console.log('Error al crear el producto por venta');
        console.log('====================================');
      }
    });
  }

  view(productSale: ProductSaleModel) {

  }

  delete(id: number) {
    this.businessLogic.getProductsSaleService().deleteProductSale(id).subscribe({
      next: () => {
        this.dataSourceProductSales.delete(id);
      },
      error: () => {
        alert('No se elimino el producto por venta')
        console.log('====================================');
        console.log('Error al eliminar el producto por venta');
        console.log('====================================');
      }
    });
  }

  getProductSaleValue(productSale: ProductSaleModel) {
    this.productSale = productSale;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateProductSaleComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isProductSaleModel(output)) {
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductSaleModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditProductSaleComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.productSale
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isProductSaleModel(output)) {
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductSaleModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteProductSaleComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.productSale.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            if (this.productSale.id) {
              this.delete(this.productSale.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductSaleModel.');
          }
        });
        break;
    }
  }

  isProductSaleModel(obj: any): obj is ProductSaleModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'saleId' in obj &&
    'productId' in obj &&
    'weight' in obj &&
    'isBorrowed' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
