import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { PackingModel } from 'src/app/models/packing.model';

@Injectable({
  providedIn: 'root'
})
export class PackingService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de empaques
   * @returns
   */
  listPackings(): Observable<PackingModel[]> {
    return this.http.get<PackingModel[]>(`${this.urlBase}packing`);
  }
}
