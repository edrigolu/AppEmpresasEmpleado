import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/interfaces/empleado';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrls: ['./modal-empleado.component.css']
})
export class ModalEmpleadoComponent implements OnInit {

  formEmpleado: FormGroup;
  titleAction: string = "Nuevo empleado";
  buttonAction: string = "Guardar";

  constructor(private currentModal: MatDialogRef<ModalEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEmpleado: Empleado,
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private _utilidadService: UtilidadService) {

    this.formEmpleado = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numDocumento: ['', Validators.required],
      esActivo: [1, Validators.required]
    });

    if (this.datosEmpleado != null) {
      this.titleAction = "Editar empleado";
      this.buttonAction = "Actualizar";
    }
  }

  ngOnInit(): void {
    if (this.datosEmpleado != null) {
      this.formEmpleado.patchValue({
        nombres: this.datosEmpleado.nombres,
        apellidos: this.datosEmpleado.apellidos,
        numDocumento: this.datosEmpleado.numDocumento,
        esActivo: this.datosEmpleado.esActivo.toString
      })
    }
  }

  guardarEmpleado() {
    const _empleado: Empleado = {
      idEmpleado: this.datosEmpleado == null ? 0 : this.datosEmpleado.idEmpleado,
      nombres: this.formEmpleado.value.nombres,
      apellidos: this.formEmpleado.value.apellidos,
      numDocumento: this.formEmpleado.value.numDocumento,
      esActivo: parseInt(this.formEmpleado.value.esActivo),
      empresa: []
    }
    if (this.datosEmpleado == null) {
      this._empleadoService.create(_empleado).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta("Empleado fue registrado.", "Exito");
            this.currentModal.close("true");
          } else {
            this._utilidadService.mostrarAlerta("Empleado no fue registrado.", "Error");
          }
        },
        error: () => { }
      })
    } else {
      this._empleadoService.edit(_empleado).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta("Empresa fue modificada.", "Exito");
            this.currentModal.close("true");
          } else {
            this._utilidadService.mostrarAlerta("Empresa no fue modificada.", "Error");
          }
        },
        error: () => {
          console.error();
        }
      })
    }

  }

}
