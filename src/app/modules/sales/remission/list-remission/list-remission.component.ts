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
    private dialog: Dialog,
  ) {
    this.dataSourceService.getRemissionsData().loadRemissions();
    this.dataSourceService.getRemissionsData().initRemission();
    this.dataSourceRemissions = this.dataSourceService.getRemissionsData().getDataSourceRemission();
  }

  ngOnInit(): void {
    if (this.dataSourceService.getRemissionsData().getError()) {
      this.loadDefaultRemissions();
      alert('Error al cargar las remisiones');
    }

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
    this.dataSourceRemissions.update(p_remission.id, { remission: p_remission.remission });
  }

  create(p_remission: RemissionModel) {
    this.dataSourceRemissions.create( { id: p_remission.id, remission: p_remission.remission, sale: p_remission.sale});
  }

  view(remission: RemissionModel) {

  }

  delete(id: number) {
    this.dataSourceRemissions.delete(id);
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
            // console.log('====================================');
            // console.log(output);
            // console.log('====================================');
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
            // console.log('====================================');
            // console.log(output);
            // console.log('====================================');
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
            // console.log('====================================');
            // console.log(output, this.remission.id);
            // console.log('====================================');
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
    'remission' in obj &&
    'sale' in obj
    );
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  loadDefaultRemissions(): void {
        this.remissions = [
      {
        id: 30,
        remission: 1,
        sale: { id: 1 },
      },
      {
        id: 40,
        remission: 2,
        sale: {id:2},
      },
      {
        id: 50,
        remission: 3,
        sale: {},
      },
    ]
    this.dataSourceRemissions.init(this.remissions);
  }

}
