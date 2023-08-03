import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faBookJournalWhills, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { debounceTime } from 'rxjs';
import { DataSourceRemission } from 'src/app/data-sources/remission-data-source';
import { RemissionModel } from 'src/app/models/remission.model';
import { CreateRemissionComponent } from '../create-remission/create-remission.component';
import { EditRemissionComponent } from '../edit-remission/edit-remission.component';
import { DeleteRemissionComponent } from '../delete-remission/delete-remission.component';
import { DataSourceService } from 'src/app/services/data-source/data-source.service';
import { BusinessLogicService } from 'src/app/services/business-logic/business-logic.service';

@Component({
  selector: 'app-list-remission',
  templateUrl: './list-remission.component.html',
  styleUrls: ['./list-remission.component.css']
})
export class ListRemissionComponent {
  faBookJournalWhills = faBookJournalWhills;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  dataSourceRemissions = new DataSourceRemission();
  remissions: RemissionModel[] = [];
  columns: string[] = ['id', 'remissionNum', 'sale', 'actions'];
  input = new FormControl('', { nonNullable: true })
  action: 'edit' | 'view' | 'remove' | 'create' = 'view';

  remission: RemissionModel = {};

  constructor(
    private dataSourceService: DataSourceService,
    private businessLogic: BusinessLogicService,
    private dialog: Dialog,
  ) {
    this.dataSourceRemissions = this.dataSourceService.getRemissionsData().getDataSourceRemission();
  }

  ngOnInit(): void {
    this.dataSourceService.getRemissionsData().loadRemissions();
    this.input.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.dataSourceRemissions.find(value);
      });
  }

  // ngOnInit(): void {
  //   this.http.get<RemissionModel[]>('https://api.escuelajs.co/api/v1/products')
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

  update(p_remission: RemissionModel) {
    this.businessLogic.getRemissionService().updateRemission(p_remission).subscribe({
      next: () => {
        this.dataSourceRemissions.update(p_remission.id, { remission: p_remission.remission });
      },
      error: () => {
        alert('No se actualizo la remision')
        console.log('====================================');
        console.log('Error al actualizar la remision');
        console.log('====================================');
      }
    });
  }

  create(p_remission: RemissionModel) {
    this.businessLogic.getRemissionService().createRemission(p_remission).subscribe({
      next: () => {
        this.dataSourceRemissions.create( { id: p_remission.id, remission: p_remission.remission, sale: p_remission.sale});
      },
      error: () => {
        alert('No se creo la remision')
        console.log('====================================');
        console.log('Error al crear la remision');
        console.log('====================================');
      }
    });
  }

  view(remission: RemissionModel) {

  }

  delete(id: number) {
    this.businessLogic.getRemissionService().deleteRemission(id).subscribe({
      next: () => {
        this.dataSourceRemissions.delete(id);
      },
      error: () => {
        alert('No se borro la remision. Por favor verifica que la remision no se encuentre en una venta en los campos de documento o remision')
        console.log('====================================');
        console.log('Error al borrar la remision');
        console.log('====================================');
      }
    });
  }

  getRemissionValue(remission: RemissionModel) {
    this.remission = remission;
  }

  openDialog(action: 'edit' | 'view' | 'remove' | 'create') {
    switch (action) {
      case 'create':
        const dialogRefCreate = this.dialog.open(CreateRemissionComponent, {
          minWidth: '300px',
          maxWidth: '50%',
        });
        dialogRefCreate.closed.subscribe(output => {
          if (this.isRemissionModel(output)) {
            this.create(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada RemissionModel.');
          }
        });
        break;
      case 'view':
        break;
      case 'edit':
        const dialogRefEdit = this.dialog.open(EditRemissionComponent, {
          minWidth: '270px',
          maxWidth: '50%',
          data: this.remission
        });
        dialogRefEdit.closed.subscribe(output => {
          if (this.isRemissionModel(output)) {
            this.update(output);
          } else {
            console.error('Tipo de salida Invalida. Se esperada RemissionModel.');
          }
        });
        break;
      case 'remove':
        const dialogRefRemove = this.dialog.open(DeleteRemissionComponent, {
          minWidth: '300px',
          maxWidth: '50%',
          data: this.remission.id
        });
        dialogRefRemove.closed.subscribe(output => {
          if (this.isNumber(output)) {
            if (this.remission.id) {
              this.delete(this.remission.id);
            }
          } else {
            console.error('Tipo de salida Invalida. Se esperada RemissionModel.');
          }
        });
        break;
    }
  }

  isRemissionModel(obj: any): obj is RemissionModel {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'remission' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

}
