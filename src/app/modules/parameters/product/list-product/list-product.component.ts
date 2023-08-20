import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faBoxesPacking, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceProduct } from 'src/app/data-sources/product-data-source';
import { ProductModel } from 'src/app/models/product.model';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  faBoxesPacking = faBoxesPacking;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;

  dataSourceProducts = new DataSourceProduct();

  products: ProductModel[] = [];
  columns: string[] = [ 'code', 'productName','totalWeight', 'actions']; //'id', 'sales'
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  product: ProductModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceProducts = this.dataSourceService.getProductsData().getDataSourceProduct();
  }

  ngOnInit(): void {
    this.dataSourceService.getProductsData().loadProducts();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceProducts.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<ProductModel[]>('https://api.escuelajs.co/api/v1/products')
  //     .subscribe(data => {
  //       this.dataSourceProducts.init(data);
  //       this.total = this.dataSourceProducts.getTotal();
  //     });

  update(product: ProductModel) {
    this.businessLogic.getProductService().updateProduct(product).subscribe({
      next: () => {
        this.dataSourceProducts.update(product.id, { code: product.code, productName: product.productName, totalWeight:product.totalWeight });
      },
      error: () => {
        alert('No se actualizo el producto')
        console.log('====================================');
        console.log('Error al actualizar el producto');
        console.log('====================================');
      }
    });
  }

  create(product: ProductModel) {
    this.businessLogic.getProductService().createProduct(product).subscribe({
      next: () => {
        this.dataSourceProducts.create( { id: product.id, code: product.code, productName: product.productName, totalWeight:product.totalWeight});
      },
      error: () => {
        alert('No se creo el producto')
        console.log('====================================');
        console.log('Error al crear el producto');
        console.log('====================================');
      }
    });
  }

  view(product: ProductModel) {

  }

  delete(id: number) {
    this.businessLogic.getProductService().deleteProduct(id).subscribe({
      next: () => {
        this.dataSourceProducts.delete(id);
      },
      error: () => {
        alert('No se borro el producto, porfavor verifica que no se encuentre en una venta')
        console.log('====================================');
        console.log('Error al borrar el producto');
        console.log('====================================');
      }
    });
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
    'totalWeight' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
