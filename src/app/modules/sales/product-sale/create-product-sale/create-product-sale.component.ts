import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleDown, faAngleUp, faBoxesPacking, faCircleXmark, faDollarSign, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Subscription, debounceTime } from 'rxjs';
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
    this.filterSale();
    this.filterProduct();
  }

  BuildForm() {
    this.fGroup = this.fb.group({
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
      saleId: this.saleId,
      sale: {id: this.saleId },
      productId: this.productId,
      product: { id: this.productId, productName: this.GetFormGroup['productName'].value },
      weight: this.GetFormGroup['weight'].value,
      isBorrowed: this.selectedToggle == 'yes' ? true : false,
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
