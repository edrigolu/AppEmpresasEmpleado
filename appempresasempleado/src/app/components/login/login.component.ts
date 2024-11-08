import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  hiddenPassword: boolean = true;
  displayLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private _usuarioServicio: UsuarioService, private _utilidadServicio: UtilidadService) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.displayLoading = true;
    const request: Login = {
      correo: this.formLogin.value.email,
      clave: this.formLogin.value.password
    }
    this._usuarioServicio.login(request).subscribe({
      next: (data) => {
        if (data.status == true) {
          this._utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"]);
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias", "Ups")
        }
      },
      complete: () => {
        this.displayLoading = false;
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error.", "Ups")
      }
    })
  }



}
