import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BillModel } from 'src/app/models/bill.model';

@Component({
  selector: 'app-delete-bill',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.css']
})
export class DeleteBillComponent {
  faCircleXmark = faCircleXmark;

  billId: number = 0;

  constructor(
    private dialogRef: DialogRef<BillModel['id']>,
    @Inject(DIALOG_DATA) billId: number,
  ) {
    this.billId = billId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.billId);
  }
}
