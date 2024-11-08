import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import { ModalEmpleadoComponent } from '../../modals/modal-empleado/modal-empleado.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, 
    private _empleadoService :EmpleadoService,
    private _utilidadServicio: UtilidadService) { }  
 
  public columnTable: string[] = ['nombres', 'apellidos', 'numDocumento', 'estado', 'acciones'];
  dataInitial: Empleado[] = [];
  dataListEmpleados = new MatTableDataSource(this.dataInitial);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;


  ngOnInit(): void {
    this.listarEmpleados();
  }

  ngAfterViewInit(): void {
    this.dataListEmpleados.paginator = this.tablePagination;;
  }

  listarEmpleados() {
    this._empleadoService.list().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListEmpleados.data = data.value;
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos.", "Error");
        }
      },
      error: () => { }
    })
  }

  borrarEmpleado(empleado: Empleado) {
    Swal.fire({
      title: 'Desea eliminar el empleado?',
      text: empleado.nombres + '' + empleado.apellidos,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver.'
    }).then(result => {
      if (result.isConfirmed) {
        this._empleadoService.delete(empleado.idEmpleado).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("Empleado eliminado.", "Exito");
              this.dataListEmpleados;
            } else {
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el empleado.", "Error");
            }
          },
          error: (e: any) => { }
        })
      }
    })
  }

  openEditEmpleadoModal(empleado: Empleado) {
    this.dialog.open(ModalEmpleadoComponent, {
      disableClose: true,
      data: empleado
    }).afterClosed().subscribe(result => {
      if (result === "true") this.listarEmpleados();
    });
  }

  openEmpleadoModal() {
    this.dialog.open(ModalEmpleadoComponent, {
      disableClose: true
    }).afterClosed().subscribe((result: string) => {
      if (result === "true") this.listarEmpleados();
    });
  }

  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListEmpleados.filter = filterValue.trim().toLocaleLowerCase();
  }


}
