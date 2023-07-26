import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SaleModel } from 'src/app/models/sale.model';

@Component({
  selector: 'app-delete-sale',
  templateUrl: './delete-sale.component.html',
  styleUrls: ['./delete-sale.component.css']
})
export class DeleteSaleComponent {
  faCircleXmark = faCircleXmark;

  saleId: number = 0;

  constructor(
    private dialogRef: DialogRef<SaleModel['id']>,
    @Inject(DIALOG_DATA) saleId: number,
  ) {
    this.saleId = saleId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.saleId);
  }
}
