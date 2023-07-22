import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceSale } from 'src/app/data-sources/sale-data-source';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { DeleteSaleComponent } from '../delete-sale/delete-sale.component';
import { EditSaleComponent } from '../edit-sale/edit-sale.component';
import { CreateSaleComponent } from '../create-sale/create-sale.component';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css']
})
export class ListSaleComponent {
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceSales = new DataSourceSale();
  sales: SaleModel[] = [];
  columns: string[] = ['id', 'saleDate', 'remission', 'sale', 'products', 'bill', 'actions' ];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  sale: SaleModel = {};

  constructor(
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.sales = [
      {
        id: 30,
      },
      {
        id: 40,
      },
      {
        id: 50,
      },
    ]
    this.dataSourceSales.init(this.sales);
  }

  ngOnInit(): void {
    // this.getSalesData();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceSales.find(value);
      });
  }

  getSalesData(): void {
    this.businessLogicService.listSales().subscribe({
      next: (salesData) => {
        this.sales = salesData;
      },
      error: (err) => {
        console.error(err);
      }
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
    this.dataSourceSales.update(p_sale.id, { id: p_sale.id });
  }

  create(p_sale: SaleModel) {
    this.dataSourceSales.create( { id: p_sale.id });
  }

  view(sale: SaleModel) {

  }

  delete(id: number) {
    this.dataSourceSales.delete(id);
  }

  getSaleValue(sale: SaleModel) {
    this.sale = sale;
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            console.log('====================================');
            console.log(output, this.sale.id);
            console.log('====================================');
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
    'remission' in obj &&
    'saleId' in obj &&
    'products' in obj &&
    'billId' in obj &&
    'remissionId' in obj &&
    'sale' in obj &&
    'bill' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
