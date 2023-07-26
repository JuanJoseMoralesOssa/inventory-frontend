import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceProduct } from 'src/app/data-sources/product-data-source';
import { ProductModel } from 'src/app/models/product.model';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceProducts = new DataSourceProduct();
  products: ProductModel[] = [];
  columns: string[] = ['id', 'code', 'productName','totalQuantity','totalWeight','sales','packing', 'actions'];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  product: ProductModel = {};

  constructor(
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.products = [
      {
        id: 30,
        code: '001',
        productName: 'Manzana',
        totalQuantity: 10,
        totalWeight: 20,
        packing: {packing:'hola'},
        sales: [{ id: 1 }, {id:2}],
      },
    ]
    this.dataSourceProducts.init(this.products);
  }

  ngOnInit(): void {
    // this.getProductsData();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceProducts.find(value);
      });
  }

  getProductsData(): void {
    this.businessLogicService.listProducts().subscribe({
      next: (productsData) => {
        this.products = productsData;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ngOnInit(): void {
  //   this.http.get<ProductModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  //   this.input.valueChanges
  //     .pipe(
  //       debounceTime(300)
  //     )
  //     .subscribe(value => {
  //       this.dataSourceProducts.find(value);
  //     });
  // }

  update(product: ProductModel) {
    this.dataSourceProducts.update(product.id, { productName: product.productName });
  }

  create(product: ProductModel) {
    this.dataSourceProducts.create( { id: product.id, productName: product.productName, sales: product.sales});
  }

  view(product: ProductModel) {

  }

  delete(id: number) {
    this.dataSourceProducts.delete(id);
  }

  getProductValue(product: ProductModel) {
    this.product = product;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateProductComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isProductModel(output)) {
            console.log('====================================');
            console.log(output);
            console.log('====================================');
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditProductComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.product
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isProductModel(output)) {
            console.log('====================================');
            console.log(output);
            console.log('====================================');
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteProductComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.product.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            console.log('====================================');
            console.log(output, this.product.id);
            console.log('====================================');
            if (this.product.id) {
              this.delete(this.product.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada ProductModel.');
          }
        });
        break;
    }
  }

  isProductModel(obj: any): obj is ProductModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'code' in obj &&
    'productName' in obj &&
    'totalQuantity' in obj &&
    'totalWeight' in obj &&
    'sales' in obj &&
    'packingId' in obj &&
    'packing' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
