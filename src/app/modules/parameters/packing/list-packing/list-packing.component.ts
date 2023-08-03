import { Component } from '@angular/core';
import { PackingModel } from 'src/app/models/packing.model';
import { DeletePackingComponent } from '../delete-packing/delete-packing.component';
import { EditPackingComponent } from '../edit-packing/edit-packing.component';
import { CreatePackingComponent } from '../create-packing/create-packing.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { DataSourcePacking } from 'src/app/data-sources/packing-data-source';
import { faEye, faPenToSquare, faSuitcase, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-packing',
  templateUrl: './list-packing.component.html',
  styleUrls: ['./list-packing.component.css']
})
export class ListPackingComponent {
  faSuitcase = faSuitcase;
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
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourcePackings = this.dataSourceService.getPackingsData().getDataSourcePacking();
  }

  ngOnInit(): void {
    this.dataSourceService.getPackingsData().loadPackings();

    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourcePackings.find(value);
      });
  }

  update(p_packing: PackingModel) {
    this.businessLogic.getPackingService().updatePacking(p_packing).subscribe({
      next: () => {
        this.dataSourcePackings.update(p_packing.id, { packing: p_packing.packing });
      },
      error: () => {
        alert('No se actualizo el empaque')
        console.log('====================================');
        console.log('Error al actualizar el empaque');
        console.log('====================================');
      }
    });
  }

  create(p_packing: PackingModel) {
    this.businessLogic.getPackingService().createPacking(p_packing).subscribe({
      next: () => {
        this.dataSourcePackings.create( { id: p_packing.id, packing: p_packing.packing, products:p_packing.products} );
      },
      error: () => {
        alert('No se creo el empaque')
        console.log('====================================');
        console.log('Error al crear el empaque');
        console.log('====================================');
      }
    });
  }

  view(packing: PackingModel) {

  }

  delete(id: number) {
    this.businessLogic.getPackingService().deletePacking(id).subscribe({
      next: () => {
        this.dataSourcePackings.delete(id);
      },
      error: () => {
        alert('No se borro el empaque, porfavor verifica que no se encuentre en un producto')
        console.log('====================================');
        console.log('Error al borrar el empaque');
        console.log('====================================');
      }
    });
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
    'packing' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
