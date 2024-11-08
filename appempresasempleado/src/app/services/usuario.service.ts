import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private acceso: string = environment.endpoint + "usuarios/";

  constructor(private http: HttpClient) { }

  login(request: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.acceso}Login`, request)
  }

  
}
