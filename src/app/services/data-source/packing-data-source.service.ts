import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { PackingModel } from 'src/app/models/packing.model';
import { DataSourcePacking } from 'src/app/data-sources/packing-data-source';

@Injectable({
  providedIn: 'root'
})
export class PackingDataSourceService {

  dataSourcePackings = new DataSourcePacking();
  load = false;
  init = false;
  error = false;
  packings: PackingModel[] = [ ]

  constructor(
    private businessLogicService: BusinessLogicService,
  ) { }

  loadPackings(): void{
    if (!this.load) {
      this.businessLogicService
        .getPackingService()
        .listPackings()
        .subscribe({
          next: (packingData) => {
            this.packings = packingData;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
          }
        });
      this.load = true;
    }
  }

  initPackings(): void {
    if (!this.init) {
      this.dataSourcePackings.init(this.packings);
      this.init = true;
    }
  }

  getDataSourcePacking(): DataSourcePacking{
    return this.dataSourcePackings;
  }

  getError(): boolean {
    return this.error;
  }
}
