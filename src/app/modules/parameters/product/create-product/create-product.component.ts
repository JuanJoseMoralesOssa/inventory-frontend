import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  product: ProductModel = {};
  productName: string ='';

  constructor(
    private dialogRef: DialogRef<ProductModel>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.BuildForm();
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

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.product = {
      id: undefined,
      productName: this.GetFormGroup['productName'].value,
      code: this.GetFormGroup['code'].value,
      totalQuantity: this.GetFormGroup['totalQuantity'].value,
      totalWeight: this.GetFormGroup['totalWeight'].value,
      sales: [],
      packingId: 0,
      packing: {},
    }
    this.dialogRef.close(this.product);
  }
}
