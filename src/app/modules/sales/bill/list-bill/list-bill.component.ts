import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faMoneyBill, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceBill } from 'src/app/data-sources/bill-data-source';
import { BillModel } from 'src/app/models/bill.model';
import { CreateBillComponent } from '../create-bill/create-bill.component';
import { EditBillComponent } from '../edit-bill/edit-bill.component';
import { DeleteBillComponent } from '../delete-bill/delete-bill.component';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent {
  faMoneyBill = faMoneyBill;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceBills = new DataSourceBill();
  bills: BillModel[] = [];
  columns: string[] = [ 'billNum', 'actions']; // 'id', 'sale',
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  bill: BillModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceBills = this.dataSourceService.getBillsData().getDataSourceBill();
  }

  ngOnInit(): void {
    this.dataSourceService.getBillsData().loadBills();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceBills.find(value);
      });
  }

  update(p_bill: BillModel) {
    this.businessLogic.getBillService().updateBill(p_bill).subscribe({
      next: () => {
        this.dataSourceBills.update(p_bill.id, { bill: p_bill.bill });
      },
      error: () => {
        alert('No se actualizo la factura')
        console.log('====================================');
        console.log('Error al actualizar la factura');
        console.log('====================================');
      }
    });
  }

  create(p_bill: BillModel) {
    this.businessLogic.getBillService().createBill(p_bill).subscribe({
      next: () => {
        this.dataSourceBills.create( { id: p_bill.id, bill: p_bill.bill});
      },
      error: () => {
        alert('No se creo la factura')
        console.log('====================================');
        console.log('Error al crear la factura');
        console.log('====================================');
      }
    });
  }

  view(bill: BillModel) {

  }

  delete(id: number) {
    this.businessLogic.getBillService().deleteBill(id).subscribe({
      next: () => {
        this.dataSourceBills.delete(id);
      },
      error: () => {
        alert('No se borro la factura. Por favor verifica que la factura no se encuentre en una venta')
        console.log('====================================');
        console.log('Error al borrar la factura');
        console.log('====================================');
      }
    });
  }

  getBillValue(bill: BillModel) {
    this.bill = bill;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateBillComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isBillModel(output)) {
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada BillModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditBillComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.bill
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isBillModel(output)) {
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada BillModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteBillComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.bill.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            if (this.bill.id) {
              this.delete(this.bill.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada BillModel.');
          }
        });
        break;
    }
  }

  isBillModel(obj: any): obj is BillModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'bill' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
