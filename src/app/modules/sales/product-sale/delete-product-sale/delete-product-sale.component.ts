import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductSaleModel } from 'src/app/models/product-sale.model';

@Component({
  selector: 'app-delete-product-sale',
  templateUrl: './delete-product-sale.component.html',
  styleUrls: ['./delete-product-sale.component.css']
})
export class DeleteProductSaleComponent {
  faCircleXmark = faCircleXmark;

  productSaleId: number = 0;

  constructor(
    private dialogRef: DialogRef<ProductSaleModel['id']>,
    @Inject(DIALOG_DATA) productSaleId: number,
  ) {
    this.productSaleId = productSaleId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.productSaleId);
  }
}
