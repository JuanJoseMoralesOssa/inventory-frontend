import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-delete-packing',
  templateUrl: './delete-packing.component.html',
  styleUrls: ['./delete-packing.component.css']
})
export class DeletePackingComponent {
  faCircleXmark = faCircleXmark;

  packingId: number = 0;

  constructor(
    private dialogRef: DialogRef<ProductModel['id']>,
    @Inject(DIALOG_DATA) packingId: number,
  ) {
    this.packingId = packingId;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.dialogRef.close(this.packingId);
  }
}
