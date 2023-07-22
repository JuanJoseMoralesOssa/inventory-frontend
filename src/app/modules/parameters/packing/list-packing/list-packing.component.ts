import { Component } from '@angular/core';
import { PackingModel } from 'src/app/models/packing.model';
import { DeletePackingComponent } from '../delete-packing/delete-packing.component';
import { EditPackingComponent } from '../edit-packing/edit-packing.component';
import { CreatePackingComponent } from '../create-packing/create-packing.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { DataSourcePacking } from 'src/app/data-sources/packing-data-source';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { BusinessLogicService } from 'src/app/services/business-logic.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-list-packing',
  templateUrl: './list-packing.component.html',
  styleUrls: ['./list-packing.component.css']
})
export class ListPackingComponent {
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourcePackings = new DataSourcePacking();
  packings: PackingModel[] = [];
  columns: string[] = ['id', 'packingName', 'products', 'actions'];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  packing: PackingModel = {};

  constructor(
    private businessLogicService: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.packings = [
      {
        id: 30,
        packing: 'Juana',
        products: [{ id: 1 }, {id:2}],
      },
      {
        id: 40,
        packing: 'Maria',
        products: [ {id:2}],
      },
      {
        id: 50,
        packing: 'Pepe',
        products: [],
      },
    ]
    this.dataSourcePackings.init(this.packings);
  }

  ngOnInit(): void {
    // this.getPackingsData();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourcePackings.find(value);
      });
  }

  getPackingsData(): void {
    this.businessLogicService.listPackings().subscribe({
      next: (packingsData) => {
        this.packings = packingsData;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  update(p_packing: PackingModel) {
    this.dataSourcePackings.update(p_packing.id, { packing: p_packing.packing });
  }

  create(p_packing: PackingModel) {
    this.dataSourcePackings.create( { id: p_packing.id, packing: p_packing.packing, products:p_packing.products} );
  }

  view(packing: PackingModel) {

  }

  delete(id: number) {
    this.dataSourcePackings.delete(id);
  }

  getPackingValue(packing: PackingModel) {
    this.packing = packing;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreatePackingComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isPackingModel(output)) {
            console.log('====================================');
            console.log(output);
            console.log('====================================');
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada PackingModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditPackingComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.packing
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isPackingModel(output)) {
            console.log('====================================');
            console.log(output);
            console.log('====================================');
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada PackingModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeletePackingComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.packing.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            console.log('====================================');
            console.log(output, this.packing.id);
            console.log('====================================');
            if (this.packing.id) {
              this.delete(this.packing.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada PackingModel.');
          }
        });
        break;
    }
  }

  isPackingModel(obj: any): obj is PackingModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'packing' in obj &&
    'products' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
