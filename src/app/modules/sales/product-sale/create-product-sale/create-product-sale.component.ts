import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBoxesPacking, faCircleXmark, faDollarSign, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { ProductModel } from 'src/app/models/product.model';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

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

  productSale: ProductSaleModel = {};

  productId: number | undefined;
  product: ProductModel | undefined;
  products: ProductModel[] | undefined;

  saleId: number | undefined;
  sale: SaleModel | undefined;
  sales: SaleModel[] | undefined;

  productSubscription: Subscription | undefined;
  salesSubscription: Subscription | undefined;

  constructor(
    private businessLogic: BusinessLogicService,
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
    this.loadSales();
    this.loadProducts();
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

  loadProducts() {
    this.salesSubscription = this.businessLogic.getProductService().listProducts().subscribe({
        next: (productsData: SaleModel[]) => {
          this.products = productsData;
        },
        error: () => {
          alert('No se cargaron los productos')
          console.log('====================================');
          console.log('Error al cargar los productos');
          console.log('====================================');
        }
      });
  }

  loadSales() {
    this.salesSubscription = this.businessLogic.getSaleService().listSales().subscribe({
        next: (salesData: SaleModel[]) => {
          this.sales = salesData;
        },
        error: () => {
          alert('No se cargaron las ventas')
          console.log('====================================');
          console.log('Error al cargar las ventas');
          console.log('====================================');
        }
      });
  }

  chooseProduct(product: ProductModel): void {
    this.productId = product.id;
    this.fGroup.patchValue({
      productName: product.productName,
    });
  }

  chooseSale(sale: SaleModel): void {
    this.saleId = sale.id
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
      sale: {id: this.saleId },
      product: { id: this.productId, productName: this.GetFormGroup['productName'].value },
      weight: this.GetFormGroup['weight'].value,
      isBorrowed: this.selectedToggle == 'yes' ? true : false,
      productId: this.productId,
      saleId: this.saleId,
    }
    this.dialogRef.close(this.productSale);
  }

  ngOnDestroy():void {
    if (this.salesSubscription) {
      this.salesSubscription.unsubscribe();
    }
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
