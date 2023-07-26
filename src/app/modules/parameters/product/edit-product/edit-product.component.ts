import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { PackingModel } from 'src/app/models/packing.model';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  product: ProductModel;
  productName: string = '';
  code: string = '';
  totalQuantity: number = 0;
  totalWeight: number = 0;
  packingId: number = 0;
  packing: PackingModel = {};

  constructor(
    private dialogRef: DialogRef<ProductModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateProduct: ProductModel,
  ) {
    this.product = updateProduct;
    this.productName = updateProduct.productName!;
    this.code = updateProduct.code!;
    this.totalQuantity = updateProduct.totalQuantity!;
    this.totalWeight = updateProduct.totalWeight!;
    this.packingId = updateProduct.packingId!;
    this.packing = updateProduct.packing!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      productName: ['', [Validators.required]],
      code: ['', [Validators.required]],
      totalQuantity: [0, [Validators.required]],
      totalWeight: [0, [Validators.required]],
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      productName: this.productName,
      code: this.code,
      totalQuantity: this.totalQuantity,
      totalWeight: this.totalWeight,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.product = {
      id: this.product.id,
      productName: this.GetFormGroup['productName'].value,
      code: this.GetFormGroup['code'].value,
      totalQuantity: this.GetFormGroup['totalQuantity'].value,
      totalWeight: this.GetFormGroup['totalWeight'].value,
      sales: this.product.sales,
      packingId: this.product.packingId,
      packing: this.product.packing,
    }
    this.dialogRef.close(this.product);
  }
}
