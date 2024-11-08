import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/interfaces/empleado';
import { Empresa } from 'src/app/interfaces/empresa';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ModalEmpresaEmpleadoComponent } from '../../modals/modal-empresa-empleado/modal-empresa-empleado.component';

@Component({
  selector: 'app-empresas-empleados',
  templateUrl: './empresas-empleados.component.html',
  styleUrls: ['./empresas-empleados.component.css']
})
export class EmpresasEmpleadosComponent implements OnInit, AfterViewInit {


  constructor(public dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _empresaService: EmpresaService,
    private _utilidadServicio: UtilidadService) { }


  dataInitialEmpleado: Empleado[] = [];
  dataListEmpleados = new MatTableDataSource(this.dataInitialEmpleado);
  dataInitialEmpresas: Empresa[] = [];
  dataListEmpresas = new MatTableDataSource(this.dataInitialEmpresas);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  ngOnInit(): void {
    this.listarEmpresas();
    this.listarEmpleados();
  }


  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
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


  listarEmpresas() {
    this._empresaService.list().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListEmpresas.data = data.value;
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos.", "Error");
        }
      },
      error: () => { }
    })
  }

  openModal() {
    this.dialog.open(ModalEmpresaEmpleadoComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "true") this.listarEmpresas();this.listarEmpleados();
    });

  }

}
