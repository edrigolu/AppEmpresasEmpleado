import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { EmpresaEmpleado } from '../interfaces/empresa-empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpresaEmpleadoService {

  private urlApiEmpresas: string = environment.endpoint + "empresas/"
  private urlApiEmpleados: string = environment.endpoint + "empleados/"
  private urlApi: string = environment.endpoint + "empresasEmpleados/"

  constructor(private _httpClient: HttpClient) { }

  companyList(): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(`${this.urlApiEmpresas}List`);
  }

  employeeList(): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(`${this.urlApiEmpleados}List`);
  }

  createRelationship(request: EmpresaEmpleado): Observable<ResponseApi> {
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Register`, request);
  }

}
