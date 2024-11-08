import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/interfaces/empresa';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';
import { ModalEmpresaComponent } from '../../modals/modal-empresa/modal-empresa.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, private _empresaService : EmpresaService,    
              private _utilidadService : UtilidadService) { }
  
  public columnTable: string[] = ['nombreEmpresa','estado', 'acciones'];
  dataInitial: Empresa[] = [];
  dataListEmpresas = new MatTableDataSource(this.dataInitial);
  @ViewChild(MatPaginator) tablePagination!: MatPaginator;

  ngOnInit(): void {
    this.listarEmpresas();
  }

  ngAfterViewInit(): void {
    this.dataListEmpresas.paginator = this.tablePagination;;
  }

  listarEmpresas() {
    this._empresaService.list().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListEmpresas.data = data.value;
        } else {
          this._utilidadService.mostrarAlerta("No se encontraron datos.", "Error");
        }
      },
      error: () => { }
    })
  }

  borrarEmpresa(empresa: Empresa) {
    Swal.fire({
      title: 'Desea eliminar la empresa?',
      text: empresa.nombreEmpresa,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver.'
    }).then(result => {
      if (result.isConfirmed) {
        this._empresaService.delete(empresa.idEmpresa).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadService.mostrarAlerta("Empresa eliminada.", "Exito");
              this.dataListEmpresas;
            } else {
              this._utilidadService.mostrarAlerta("No se pudo eliminar la empresa.", "Error");
            }
          },
          error: (e: any) => { }
        })
      }
    })
  }


  openEditEmpresaModal(empresa: Empresa) {
    this.dialog.open(ModalEmpresaComponent, {
      disableClose: true,
      data: empresa
    }).afterClosed().subscribe(result => {
      if (result === "true") this.listarEmpresas();
    });
  }


  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListEmpresas.filter = filterValue.trim().toLocaleLowerCase();
  }

  openEmpresaModal() {
    this.dialog.open(ModalEmpresaComponent, {
      disableClose: true
    }).afterClosed().subscribe((result: string) => {
      if (result === "true") this.listarEmpresas();
    });
  }

}
