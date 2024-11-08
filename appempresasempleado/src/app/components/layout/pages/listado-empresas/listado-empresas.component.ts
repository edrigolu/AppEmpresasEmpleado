import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/interfaces/empresa';
import { UtilidadService } from 'src/app/reusable/utilidad.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-listado-empresas',
  templateUrl: './listado-empresas.component.html',
  styleUrls: ['./listado-empresas.component.css']
})
export class ListadoEmpresasComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog, private _empresaService: EmpresaService, private _utilidadService: UtilidadService) { }

  public columnTable: string[] = ['nombreEmpresa', 'estado'];
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

  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListEmpresas.filter = filterValue.trim().toLocaleLowerCase();
  }

}
