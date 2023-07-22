import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  faCircleXmark = faCircleXmark;

  productId: number = 0;

  constructor(
    private dialogRef: DialogRef<ProductModel['id']>,
    @Inject(DIALOG_DATA) productId: number,
  ) {
    this.productId = productId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.productId);
  }

}
