import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { faEye, faFileInvoiceDollar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { CreateProductSaleComponent } from '../create-product-sale/create-product-sale.component';
import { EditProductSaleComponent } from '../edit-product-sale/edit-product-sale.component';
import { DeleteProductSaleComponent } from '../delete-product-sale/delete-product-sale.component';
import { DataSourceProductSale } from 'src/app/data-sources/product-sale-data-source';
import { FormControl } from '@angular/forms';

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
  columns: string[] = ['id', 'quantity','sale', 'product', 'weight', 'IsBorrowed', 'actions' ];
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';
  input = new FormControl('', { nonNullable: true })

  productSale: ProductSaleModel = {};

  constructor(
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.productSales = [
      {
        id: 30,
        quantity: 1,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
        IsBorrowed: true,
      },
      {
        id: 31,
        quantity: 1,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
        IsBorrowed: false,
      },
      {
        id: 32,
        quantity: 1,
        sale: { id: 20 },
        product: { productName: 'Lecosin' },
        weight: 20.1,
      },
    ]
    this.dataSourceProductSales.init(this.productSales);
  }

  ngOnInit(): void {
    // this.getProductSalesData();


  }

  // getProductSalesData(): void {
  //   this.businessLogicService.listProductSales().subscribe({
  //     next: (productSalesData) => {
  //       this.productSales = productSalesData;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   this.http.get<ProductSaleModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  //   this.input.valueChanges
  //     .pipe(
  //       debounceTime(300)
  //     )
  //     .subscribe(value => {
  //       this.dataSourceProducts.find(value);
  //     });
  // }

  update(p_productSale: ProductSaleModel) {
    this.dataSourceProductSales.update(p_productSale.id, { id: p_productSale.id });
  }

  create(p_productSale: ProductSaleModel) {
    this.dataSourceProductSales.create( { id: p_productSale.id });
  }

  view(productSale: ProductSaleModel) {

  }

  delete(id: number) {
    this.dataSourceProductSales.delete(id);
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
            // console.log('====================================');
            // console.log(output);
            // console.log('====================================');
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
            // console.log('====================================');
            // console.log(output);
            // console.log('====================================');
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
            // console.log('====================================');
            // console.log(output, this.productSale.id);
            // console.log('====================================');
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
    'sale' in obj &&
    'productId' in obj &&
    'product' in obj &&
    'quantity' in obj &&
    'weight' in obj &&
    'IsBorrowed' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
