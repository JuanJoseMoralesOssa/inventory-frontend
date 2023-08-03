import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigRoutesBackend } from 'src/app/config/config.routes.backend';
import { RemissionModel } from 'src/app/models/remission.model';

@Injectable({
  providedIn: 'root'
})
export class RemissionService {

  urlBase: string = ConfigRoutesBackend.urlBusinessLogic;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Listado de remisiones
   * @returns
   */
  listRemissions(): Observable<RemissionModel[]> {
    return this.http.get<RemissionModel[]>(`${this.urlBase}remission`);
  }

  listRemissionsWithRelations(): Observable<RemissionModel[]> {
    return this.http.get<RemissionModel[]>(`${this.urlBase}remission-relations`);
  }

  createRemission(data: RemissionModel): Observable<RemissionModel>{
    return this.http.post<RemissionModel>(`${this.urlBase}remission`, data);
  }

  updateRemission(data: RemissionModel): Observable<RemissionModel>{
    return this.http.put<RemissionModel>(`${this.urlBase}remission/${data.id}`, data);
  }

  deleteRemission(remissionId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}remission/${remissionId}`);
  }

}
