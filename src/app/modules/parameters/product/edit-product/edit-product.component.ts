import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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

  code: string = '';
  productName: string = '';
  totalWeight: number = 0;

  constructor(
    private dialogRef: DialogRef<ProductModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateProduct: ProductModel,
  ) {
    this.product = updateProduct;
    this.code = updateProduct.code!;
    this.productName = updateProduct.productName!;
    this.totalWeight = updateProduct.totalWeight!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
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

  updateFormValues() {
    this.fGroup.patchValue({
      code: this.code,
      productName: this.productName,
      totalWeight: this.totalWeight,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.product = {
      id: this.product.id,
      code: this.GetFormGroup['code'].value,
      productName: this.GetFormGroup['productName'].value,
      totalWeight: this.GetFormGroup['totalWeight'].value,
    }
    this.dialogRef.close(this.product);
  }
}
