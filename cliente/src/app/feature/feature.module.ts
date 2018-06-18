import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { Angular2FontawesomeModule} from "angular2-fontawesome";

/* Componentes */
import { FeatureComponent } from './feature/feature.component';

/* Servicios */

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
  ]
})
export class FeatureModule { }
