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
    private dialog: Dialog,
  ) {
    this.dataSourceService.getSaleData().loadSales();
    this.dataSourceService.getSaleData().initSales();
    this.dataSourceSales = this.dataSourceService.getSaleData().getDataSourceSale();
  }

  ngOnInit(): void {
    if (this.dataSourceService.getSaleData().getError()) {
      this.loadDefaultSales();
      alert('Error al cargar las ventas');
    }

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceSales.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<SaleModel[]>('https://api.escuelajs.co/api/v1/products')
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

  update(p_sale: SaleModel) {
    this.dataSourceSales.update(p_sale.id, { id: p_sale.id, saleDate: p_sale.saleDate, remissionNumModel: p_sale.remissionNumModel, client: p_sale.client, remission: p_sale.remission, bill: p_sale.bill });
  }

  create(p_sale: SaleModel) {
    this.dataSourceSales.create( { id: p_sale.id, saleDate: p_sale.saleDate, remissionNumModel: p_sale.remissionNumModel, client: p_sale.client, remission: p_sale.remission, bill: p_sale.bill});
  }

  view(sale: SaleModel) {

  }

  delete(id: number) {
    this.dataSourceSales.delete(id);
  }

  getSaleValue(sale: SaleModel) {
    this.sale = sale;
  }

  openCreateProductSale(): void {
    const dialogRefCreate = this.dialog.open(CreateProductSaleComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: this.sale.id,
    });
    dialogRefCreate.closed.subscribe(output => {
      if (this.isProductSaleModel(output)) {
            console.log('====================================');
            console.log(output, 'falttaaaaaaaaaa arreglar el create pero de product sale no de sale');
            console.log('====================================');
            this.create(output);
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
            // console.log('====================================');
            // console.log(output);
            // console.log('====================================');
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            // console.log('====================================');
            // console.log(output, this.sale.id);
            // console.log('====================================');
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
    'remissionNumModel' in obj &&
    'remissionNumId' in obj &&
    'clientId' in obj &&
    'client' in obj &&
    'products' in obj &&
    'billId' in obj &&
    'bill' in obj &&
    'remissionId' in obj &&
    'remission' in obj
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
    'sale' in obj &&
    'productId' in obj &&
    'product' in obj &&
    'quantity' in obj &&
    'weight' in obj &&
    'isBorrowed' in obj
    );
  }

  loadDefaultSales(): void {
    this.sales = [
      {
        id: 30,
        saleDate: new Date(),
        remissionNumModel: { id: 1,remission: 2 },
        products: [{ id: 1, productName: 'lecosin' }, { id: 2, productName: 'Lecosin Kj' }],
        client: { id: 1, clientName: 'Perez Martinez' },
        remission: { id: 1, remission: 2 },
      },
      {
        id: 40,
        saleDate: new Date(),
        remissionNumModel: { id: 1,remission: 3 },
        products: [{ id: 1, productName: 'Impecryl' }, { id: 2, productName: 'Acido Formico' }, { id: 3, productName: 'Formiato' }],
        client: { id: 1, clientName: 'Martinez Juarez' },
        bill: {id: 1, bill: 3}
      },
      {
        id: 50,
        saleDate: new Date(),
        remissionNumModel: { id: 1,remission: 4 },
        products: [],
        client: { id: 1, clientName: 'Ana Suñiga' },
        bill: { id: 1, bill: 5 }
      },
    ]
    this.dataSourceSales.init(this.sales);
  }

}
