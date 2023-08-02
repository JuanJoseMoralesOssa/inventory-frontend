import { Injectable } from '@angular/core';
import { BusinessLogicService } from '../business-logic/business-logic.service';
import { DataSourceRemission } from 'src/app/data-sources/remission-data-source';
import { RemissionModel } from 'src/app/models/remission.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemissionDataSourceService {

  dataSourceRemissions = new DataSourceRemission();
  load = false;
  init = false;
  remissions: RemissionModel[] = []
  private dataSubject$: BehaviorSubject<RemissionModel[]> | undefined;


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
            this.initRemission();
            this.dataSubject$ = this.getDataFromDataSource();
            this.init = true;
            this.load = true;
          },
          error: (err) => {
            console.log(err);
            this.loadDefaultRemissions();
          }
        });
    }
  }

  initRemission(): void {
    if (!this.init) {
      this.dataSourceRemissions.init(this.remissions);
    }
  }

  getDataSourceRemission(): DataSourceRemission{
    return this.dataSourceRemissions;
  }

  getDataFromDataSource(): BehaviorSubject<RemissionModel[]> {
    return this.dataSourceRemissions.data;
  }

  getRemissions(): Observable<RemissionModel[]> {
    this.dataSubject$ = this.getDataFromDataSource();
    if (this.remissions.length > 0) {
      return this.dataSubject$.asObservable(); // Return cached products as an observable
    } else {
      return this.businessLogicService
        .getRemissionService()
        .listRemissions().pipe(
        tap((remissionsData: RemissionModel[]) => {
          this.remissions = remissionsData; // Cache the fetched products
          this.dataSubject$!.next(remissionsData); // Emit the products using the BehaviorSubject
        })
      );
    }
  }

  loadDefaultRemissions(): void {
    alert('Error al cargar las remisiones');
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
