import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { EmpresasEmpleadosComponent } from './pages/empresas-empleados/empresas-empleados.component';
import { ListadoEmpleadosComponent } from './pages/listado-empleados/listado-empleados.component';
import { ListadoEmpresasComponent } from './pages/listado-empresas/listado-empresas.component';
import { ModalEmpresaComponent } from './modals/modal-empresa/modal-empresa.component';
import { ModalEmpleadoComponent } from './modals/modal-empleado/modal-empleado.component';
import { ModalEmpresaEmpleadoComponent } from './modals/modal-empresa-empleado/modal-empresa-empleado.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/reusable/shared/shared.module';



@NgModule({
  declarations: [
    EmpleadoComponent,
    EmpresaComponent,
    EmpresasEmpleadosComponent,
    ListadoEmpleadosComponent,
    ListadoEmpresasComponent,
    ModalEmpresaComponent,
    ModalEmpleadoComponent,
    ModalEmpresaEmpleadoComponent
  ],
  imports: [
    CommonModule,    
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
