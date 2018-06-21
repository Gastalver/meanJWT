import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent} from "./registro/registro.component";
import { AccesoComponent} from "./acceso/acceso.component";
import {EdicionUsuarioComponent} from "./edicion-usuario/edicion-usuario.component";

const rutasUsuario: Routes = [
  {path: 'registro', component: RegistroComponent},
  {path: 'acceso', component: AccesoComponent },
  {path: 'usuario', component: EdicionUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(rutasUsuario)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
