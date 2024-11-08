import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent implements OnInit,AfterViewInit  {

  constructor(public dialog: MatDialog, 
    private _empleadoService :EmpleadoService,
    private _utilidadServicio: UtilidadService) { }  
 
  public columnTable: string[] = ['nombres', 'apellidos', 'numDocumento', 'estado'];
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
  
  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListEmpleados.filter = filterValue.trim().toLocaleLowerCase();
  }

}
