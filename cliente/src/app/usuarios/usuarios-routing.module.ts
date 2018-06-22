import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent} from "./registro/registro.component";
import { AccesoComponent} from "./acceso/acceso.component";
import {EdicionUsuarioComponent} from "./edicion-usuario/edicion-usuario.component";

/* Servicios */
import { UsuarioGuard} from "../core/usuario.guard";

const rutasUsuario: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'acceso', component: AccesoComponent },
  {path: 'usuario', component: EdicionUsuarioComponent, canActivate:[UsuarioGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(rutasUsuario)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
