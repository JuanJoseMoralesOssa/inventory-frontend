import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { PackingModel } from 'src/app/models/packing.model';
import { DataSourcePacking } from 'src/app/data-sources/packing-data-source';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackingDataSourceService {

  dataSourcePackings = new DataSourcePacking();
  load = false;
  init = false;
  packings: PackingModel[] = []
  private dataSubject$: BehaviorSubject<PackingModel[]> | undefined;

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
            this.initPackings();
            this.dataSubject$ = this.getDataFromDataSource();
            this.init = true;
            this.load = true;
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultPackings();
          }
        });
    }
  }

  initPackings(): void {
    if (!this.init) {
      this.dataSourcePackings.init(this.packings);
    }
  }

  getDataSourcePacking(): DataSourcePacking{
    return this.dataSourcePackings;
  }

  getDataFromDataSource(): BehaviorSubject<PackingModel[]> {
    return this.dataSourcePackings.data;
  }

  getProducts(): Observable<PackingModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.packings.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getPackingService()
        .listPackings().pipe(
        tap((packingsData: PackingModel[]) => {
          this.packings = packingsData; // Cache the fetched products
          this.dataSubject$!.next(packingsData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultPackings(): void {
    alert('Error al cargar los empaques');

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
}
