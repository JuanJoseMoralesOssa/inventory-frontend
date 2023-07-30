import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceRemission } from 'src/app/data-sources/remission-data-source';
import { RemissionModel } from 'src/app/models/remission.model';

@Injectable({
  providedIn: 'root'
})
export class RemissionDataSourceService {

  dataSourceRemissions = new DataSourceRemission();
  load = false;
  init = false;
  error = false;
  remissions: RemissionModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadRemissions(): void{
    if (!this.load) {
      this.businessLogicService
        .getRemissionService()
        .listRemissions()
        .subscribe({
          next: (remissionsData) => {
            this.remissions = remissionsData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;

          }
        });
      this.load = true;
    }
  }

  initRemission(): void {
    if (!this.init) {
      this.dataSourceRemissions.init(this.remissions);
      this.init = true;
    }
  }

  getDataSourceRemission(): DataSourceRemission{
    return this.dataSourceRemissions;
  }

  getError(): boolean {
    return this.error;
  }

}
