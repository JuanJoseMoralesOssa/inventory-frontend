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
  // productName: string ='';

  constructor(
    private dialogRef: DialogRef<ProductModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateProduct: ProductModel,
  ) {
    this.product = updateProduct;
    // this.productName = updateProduct.product!;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      productName: ['', [Validators.required]]
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      // productName: this.productName,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeWithRes() {
    this.product = {
      id: this.product.id,
      productName: this.GetFormGroup['productName'].value,
      // products: this.product.products,
    }
    this.dialogRef.close(this.product);
  }
}
