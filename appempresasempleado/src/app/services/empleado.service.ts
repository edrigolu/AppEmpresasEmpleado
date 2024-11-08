import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlApi: string = environment.endpoint + "empleados/"
  
  constructor(private _httpClient: HttpClient) { }

  create(request: Empleado): Observable<ResponseApi> {
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Create`, request);
  }

  edit(request: Empleado): Observable<ResponseApi> {
    return this._httpClient.put<ResponseApi>(`${this.urlApi}Edit`, request);
  }

  delete(idEmpleado: number): Observable<ResponseApi> {
    return this._httpClient.delete<ResponseApi>(`${this.urlApi}Delete/${idEmpleado}`);
  }

  list(): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(`${this.urlApi}List`);
  }
  
}
