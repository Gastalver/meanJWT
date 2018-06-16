import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent} from "./registro/registro.component";
import { AccesoComponent} from "./acceso/acceso.component";

const rutasUsuario: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'acceso', component: AccesoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(rutasUsuario)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
