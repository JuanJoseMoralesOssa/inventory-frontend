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
      code: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      totalWeight: ['', [Validators.required]],
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
      code: this.GetFormGroup['code'].value,
      productName: this.GetFormGroup['productName'].value,
      totalWeight: this.GetFormGroup['totalWeight'].value,
    }
    this.dialogRef.close(this.product);
  }
}
