import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/interfaces/empleado';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaEmpleado } from 'src/app/interfaces/empresa-empleado';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpresaEmpleadoService } from 'src/app/services/empresa-empleado.service';

@Component({
  selector: 'app-modal-empresa-empleado',
  templateUrl: './modal-empresa-empleado.component.html',
  styleUrls: ['./modal-empresa-empleado.component.css']
})
export class ModalEmpresaEmpleadoComponent {


  formEmpresaEmpleado: FormGroup;  
  titleAction: string = "Nueva relación empresa & empleado";
  buttonAction: string = "Guardar";
  listEmpresas: Empresa[] = [];
  listEmpleados:Empleado[]=[];
  
  constructor(private currentModal: MatDialogRef<ModalEmpresaEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpresaEmpleado: EmpresaEmpleado,
    private fb: FormBuilder,
    private _servicioEmpresaEmpleado: EmpresaEmpleadoService,    
    private _utilidadService: UtilidadService) {

    this.formEmpresaEmpleado = this.fb.group({
      idEmpresa: ['', Validators.required],
      idEmpleado: ['', Validators.required],      
      esActivo: [1, Validators.required],
    });
    if (this.dataEmpresaEmpleado != null) {
      this.titleAction = "Editar relación empresa & empleado";
      this.buttonAction = "Actualizar";
    }

    this._servicioEmpresaEmpleado.companyList().subscribe({
      next: (data) => {
        if (data.status) {
          this.listEmpresas = data.value;
        }
      },
      error: () => {
        console.error();
      }
    })

    this._servicioEmpresaEmpleado.employeeList().subscribe({
      next: (data) => {
        if (data.status) {
          this.listEmpleados = data.value;
        }
      },
      error: () => {
        console.error();
      }
    })

  }

  ngOnInit(): void {
    if (this.dataEmpresaEmpleado != null) {
      this.formEmpresaEmpleado.patchValue({        
        idEmpresa: this.dataEmpresaEmpleado.idEmpresa,
        idEmpleado: this.dataEmpresaEmpleado.idEmpleado,
        esActivo: this.dataEmpresaEmpleado.esActivo.toString
      })
    }
  }

  saveUser() {
    const _empresaEmpleado: EmpresaEmpleado = {
      idEmpresaEmpleado: this.dataEmpresaEmpleado == null ? 0 : this.dataEmpresaEmpleado.idEmpresaEmpleado,         
      idEmpresa: this.formEmpresaEmpleado.value.idEmpresa,
      idEmpleado: this.formEmpresaEmpleado.value.idEmpleado,
      esActivo: parseInt(this.formEmpresaEmpleado.value.esActivo)
    }
    if (this.dataEmpresaEmpleado == null) {
      this._servicioEmpresaEmpleado.createRelationship(_empresaEmpleado).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadService.mostrarAlerta("Usuario fue registrado.", "Exito");
            this.currentModal.close("true");
          } else {
            this._utilidadService.mostrarAlerta("Usuario no fue registrado.", "Error");
          }
        },
        error: () => {}
      })
    // } else {
    //   this._servicioEmpresaEmpleado.edit(_empresaEmpleado).subscribe({
    //     next: (data) => {
    //       if (data.status) {
    //         this._utilidadService.mostrarAlerta("Usuario fue modificado", "Exito");
    //         this.currentModal.close("true");
    //       } else {
    //         this._utilidadService.mostrarAlerta("Usuario no fue modificado", "Error");
    //       }
    //     },
    //     error: () => {
    //       console.error();
    //     }
    //   })
    
    }
  }  

}
