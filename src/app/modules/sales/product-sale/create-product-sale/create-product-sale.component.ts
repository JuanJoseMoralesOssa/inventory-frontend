import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBoxesPacking, faCircleXmark, faDollarSign, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { ProductModel } from 'src/app/models/product.model';
import { SaleModel } from 'src/app/models/sale.model';

@Component({
  selector: 'app-create-product-sale',
  templateUrl: './create-product-sale.component.html',
  styleUrls: ['./create-product-sale.component.css']
})
export class CreateProductSaleComponent {
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faBoxesPacking = faBoxesPacking;
  faDollarSign = faDollarSign;
  faCircleXmark = faCircleXmark;
  fGroup: FormGroup = new FormGroup({});

  selectedToggle: string = 'no';
  saleId: number | undefined;

  productSale: ProductSaleModel = {};
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
    @Inject(DIALOG_DATA) saleId: number,
    private fb: FormBuilder,
  ) {
    if (saleId) {
      this.saleId = saleId;
    }
  }

  ngOnInit() {
    this.BuildForm();
    if (this.saleId) {
      this.fGroup.patchValue({
        saleId: this.saleId,
      });
    }
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
