import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlApi: string = environment.endpoint + "Empresas/"
  
  constructor(private _httpClient: HttpClient) { }

  create(request: Empresa): Observable<ResponseApi> {
    return this._httpClient.post<ResponseApi>(`${this.urlApi}Create`, request);
  }

  edit(request: Empresa): Observable<ResponseApi> {
    return this._httpClient.put<ResponseApi>(`${this.urlApi}Edit`, request);
  }

  delete(idEmpresa: number): Observable<ResponseApi> {
    return this._httpClient.delete<ResponseApi>(`${this.urlApi}Delete/${idEmpresa}`);
  }

  list(): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(`${this.urlApi}List`);
  }
}
