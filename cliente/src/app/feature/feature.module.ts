import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { Angular2FontawesomeModule} from "angular2-fontawesome";

/* Componentes */
import { FeatureComponent } from './feature/feature.component';

/* Servicios */
import { UsuarioService} from "../core/usuario.service";
import { UsuarioGuard} from "../core/usuario.guard";

/* Rutas */
import { FeatureRoutingModule } from './feature-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    Angular2FontawesomeModule,
    FeatureRoutingModule
  ],
  declarations: [
    FeatureComponent,
  ],
  providers: [
    UsuarioService,
    UsuarioGuard
  ]
})
export class FeatureModule { }
