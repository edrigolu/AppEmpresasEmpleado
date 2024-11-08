import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarAlerta(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    })
  }

  guardarSesionUsuario(sesionUsuario: Sesion) {
    localStorage.setItem("usuario", JSON.stringify(sesionUsuario));
  }

  obtenerSesionUsuario() {
    const cadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(cadena!);
    return usuario;
  }

  borrarSesionUsuario() {
    localStorage.removeItem("usuario");
  }
}
