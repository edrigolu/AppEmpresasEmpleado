import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  listaMenus: Menu[] = [];
  correoUsuario: string = '';
  rolUsuario: string = '';

  constructor(private router: Router, private _menuServicio: MenuService, private _utilidadesServicio: UtilidadService) { }

  ngOnInit(): void {
    const usuario = this._utilidadesServicio.obtenerSesionUsuario();
    if (usuario != null) {
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.rolDescripcion;

      this._menuServicio.list(usuario.idUsuario).subscribe({
        next: (data) => {
          if (data.status) this.listaMenus = data.value;
        },
        error: (e) => { }
      });
    }
  }


  cerrarSesion() {
    this._utilidadesServicio.borrarSesionUsuario();
    this.router.navigate(["login"]);
  }


}
