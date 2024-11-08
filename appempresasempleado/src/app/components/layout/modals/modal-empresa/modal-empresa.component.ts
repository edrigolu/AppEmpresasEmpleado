import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/interfaces/empresa';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {
  
  formEmpresa: FormGroup;
  titleAction: string = "Nueva empresa";
  buttonAction: string = "Guardar";

  constructor(private currentModal: MatDialogRef<ModalEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEmpresa: Empresa,
    private fb: FormBuilder,
    private _empresaService: EmpresaService,
    private _utilidadService: UtilidadService) {

    this.formEmpresa = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      esActivo: [1, Validators.required]
    });

    if (this.datosEmpresa != null) {
      this.titleAction = "Editar empresa";
      this.buttonAction = "Actualizar";
    }
  }

  ngOnInit(): void {
    if (this.datosEmpresa != null) {
      this.formEmpresa.patchValue({
        nombres: this.datosEmpresa.nombreEmpresa,
        esActivo: this.datosEmpresa.esActivo.toString
      })
    }
  }


  guardarEmpresa() {
    const _empresa: Empresa = {
      idEmpresa: this.datosEmpresa == null ? 0 : this.datosEmpresa.idEmpresa,
      nombreEmpresa: this.formEmpresa.value.nombreEmpresa,
      esActivo: parseInt(this.formEmpresa.value.esActivo)
    }
    if (this.datosEmpresa == null) {
      this._empresaService.create(_empresa).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta("Empresa fue registrada.", "Exito");
            this.currentModal.close("true");
          } else {
            this._utilidadService.mostrarAlerta("Empresa no fue registrada.", "Error");
          }
        },
        error: () => { }
      })
    } else {
      this._empresaService.edit(_empresa).subscribe({
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
