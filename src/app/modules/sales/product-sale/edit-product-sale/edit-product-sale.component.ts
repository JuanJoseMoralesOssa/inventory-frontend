import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBoxesPacking, faCircleXmark, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Subscription, debounceTime } from 'rxjs';
import { ProductSaleModel } from 'src/app/models/product-sale.model';
import { ProductModel } from 'src/app/models/product.model';
import { SaleModel } from 'src/app/models/sale.model';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

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
  weight: number | undefined;
  isBorrowed: boolean | undefined;

  productId: number | undefined;
  product: ProductModel | undefined;
  products: ProductModel[] | undefined;
  filteredProducts: ProductModel[] | undefined;

  saleId: number | undefined;
  sale: SaleModel | undefined;
  sales: SaleModel[] | undefined;
  filteredSales: SaleModel[] | undefined;

  productSubscription: Subscription | undefined;
  salesSubscription: Subscription | undefined;

  constructor(
    private businessLogic: BusinessLogicService,
    private dialogRef: DialogRef<ProductSaleModel>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) updateProductSale: ProductSaleModel,
  ) {
    this.productSale = updateProductSale;
    this.quantity = updateProductSale.quantity;
    this.sale = updateProductSale.sale;
    this.saleId = updateProductSale.saleId;
    this.product = updateProductSale.product;
    this.productId = updateProductSale.productId;
    this.weight = updateProductSale.weight;
    this.isBorrowed = updateProductSale.isBorrowed;
  }

  ngOnInit() {
    this.BuildForm();
    this.updateFormValues();
    this.loadSales();
    this.loadProducts();
    this.filterSale();
    this.filterProduct();
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

  filterSale() {
    this.GetFormGroup['saleId'].valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (value === null) {
          this.filteredSales = this.sales;
        }
        else {
          if (this.sales?.length) {
            this.filteredSales = this.sales.filter(item => {
            const filter = `${item.id}`;
              if (item.id == value) {
                this.saleId = item.id;
              }
            return filter.includes(value);
          });
        }
      }
    });
  }

  filterProduct() {
    this.GetFormGroup['productName'].valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        if (value === null) {
          this.filteredProducts = this.products;
        }
        else {
          if (this.products?.length) {
            this.filteredProducts = this.products.filter(item => {
            const filter = `${item.productName}`;
              if (item.productName?.toLowerCase() === value.toLowerCase()) {
                this.productId = item.id;
              }
            return filter.toLowerCase().includes(value.toLowerCase());
          });
        }
      }
    });
  }

  loadProducts() {
    this.salesSubscription = this.businessLogic.getProductService().listProducts().subscribe({
        next: (productsData: SaleModel[]) => {
        this.products = productsData;
        this.filteredProducts = this.products;
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
        this.filteredSales = this.sales;
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
    this.saleId = sale.id;
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
