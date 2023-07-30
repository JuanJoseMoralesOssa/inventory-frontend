import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBoxesPacking, faCircleXmark, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { ProductModel } from 'src/app/models/product.model';
import { SaleModel } from 'src/app/models/sale.model';

@Component({
  selector: 'app-edit-product-sale',
  templateUrl: './edit-product-sale.component.html',
  styleUrls: ['./edit-product-sale.component.css']
})
export class EditProductSaleComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faBoxesPacking = faBoxesPacking;
  faDollarSign = faDollarSign;
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  selectedToggle: string = 'no';

  productSale: ProductSaleModel = {};
  quantity: number | undefined;
  sale: SaleModel | undefined;
  product: ProductModel | undefined;
  weight: number | undefined;
  isBorrowed: boolean | undefined;

  sales = [
    { id: 1 },
    { id: 2 },
  ]

  products = [
    { productName: 'Producto 1' },
    { productName: 'Producto 2' },
  ];

  constructor(
    private dialogRef: DialogRef<ProductSaleModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateProductSale: ProductSaleModel,
  ) {
    this.productSale = updateProductSale;
    this.quantity = updateProductSale.quantity;
    this.sale = updateProductSale.sale;
    this.product = updateProductSale.product;
    this.weight = updateProductSale.weight;
    this.isBorrowed = updateProductSale.isBorrowed;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
      quantity: ['', [Validators.required]],
      saleId: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      isBorrowed: ['', [Validators.required]],
    });
  }

  chooseProduct(product: ProductModel): void {
    this.fGroup.patchValue({
      productName: product.productName,
    });
  }

  chooseSale(sale: SaleModel): void {
    this.fGroup.patchValue({
      saleId: sale.id,
    });
  }

  get GetFormGroup() {
    return this.fGroup.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  selectToggle(value: string) {
    this.selectedToggle = value;
  }

  updateFormValues() {
    this.fGroup.patchValue({
      quantity: this.quantity,
      saleId: this.sale ? this.sale.id: undefined,
      productName: this.product ? this.product.productName: undefined,
      weight: this.weight,
    });
    this.isBorrowed ? this.selectToggle('yes'): this.selectToggle('no');
  }

  closeWithRes() {
    this.productSale = {
      id: this.productSale.id,
      quantity: this.GetFormGroup['quantity'].value,
      sale: {id: this.GetFormGroup['saleId'].value},
      product: { productName: this.GetFormGroup['productName'].value },
      weight: this.GetFormGroup['weight'].value,
      isBorrowed: this.selectedToggle == 'yes' ? true : false,
      productId: undefined,
      saleId: undefined,
    }
    this.dialogRef.close(this.productSale);
  }

}
