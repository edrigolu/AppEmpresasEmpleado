import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { EmpresasEmpleadosComponent } from './pages/empresas-empleados/empresas-empleados.component';
import { ListadoEmpleadosComponent } from './pages/listado-empleados/listado-empleados.component';
import { ListadoEmpresasComponent } from './pages/listado-empresas/listado-empresas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'empleados', component: EmpleadoComponent },
      { path: 'empresas', component: EmpresaComponent },
      { path: 'empresas-empleados', component: EmpresasEmpleadosComponent },
      { path: 'listado-empleados', component: ListadoEmpleadosComponent },
      { path: 'listado-empresas', component: ListadoEmpresasComponent },
    ]
  }
];


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class LayoutRoutingModule { }


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }