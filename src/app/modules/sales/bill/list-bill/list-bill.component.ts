import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceBill } from 'src/app/data-sources/bill-data-source';
import { BillModel } from 'src/app/models/bill.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { CreateBillComponent } from '../create-bill/create-bill.component';
import { EditBillComponent } from '../edit-bill/edit-bill.component';
import { DeleteBillComponent } from '../delete-bill/delete-bill.component';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent {
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceBills = new DataSourceBill();
  bills: BillModel[] = [];
  columns: string[] = ['id', 'billNum', 'sales', 'actions'];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  bill: BillModel = {};

  constructor(
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.bills = [
      {
        id: 30,
        bill: 1,
        sale: { id: 1 },
      },
      {
        id: 40,
        bill: 2,
        sale: {id:2},
      },
      {
        id: 50,
        bill: 3,
        sale: {},
      },
    ]
    this.dataSourceBills.init(this.bills);
  }

  ngOnInit(): void {
    // this.getBillsData();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceBills.find(value);
      });
  }

  getBillsData(): void {
    this.businessLogicService.listBills().subscribe({
      next: (billsData) => {
        this.bills = billsData;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  update(bill: BillModel) {
    this.dataSourceBills.update(bill.id, { bill: bill.bill });
  }

  create(p_bill: BillModel) {
    this.dataSourceBills.create( { id: p_bill.id, bill: p_bill.bill, sale: p_bill.sale});
  }

  view(bill: BillModel) {

  }

  delete(id: number) {
    this.dataSourceBills.delete(id);
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            console.log('====================================');
            console.log(output);
            console.log('====================================');
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
            console.log('====================================');
            console.log(output, this.bill.id);
            console.log('====================================');
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
    'bill' in obj &&
    'sale' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
