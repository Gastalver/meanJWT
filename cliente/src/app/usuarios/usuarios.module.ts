import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { AccesoComponent } from './acceso/acceso.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { EdicionUsuarioComponent } from './edicion-usuario/edicion-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    UsuariosRoutingModule
  ],
  declarations: [
    RegistroComponent,
    AccesoComponent,
    EdicionUsuarioComponent
  ]
})
export class UsuariosModule { }
