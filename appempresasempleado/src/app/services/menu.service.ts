import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlApi: string = environment.endpoint + "Menu/"

  constructor(private _httpClient: HttpClient) { }

  list(idUsuario: number): Observable<ResponseApi> {
    return this._httpClient.get<ResponseApi>(`${this.urlApi}List?idUsuario=${idUsuario}`);
  }

  
}
