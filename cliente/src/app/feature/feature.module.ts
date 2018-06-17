import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";

/* Componentes */
import { FeatureComponent } from './feature/feature.component';

/* Servicios */

/* Rutas */
import { FeatureRoutingModule } from './feature-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FeatureRoutingModule
  ],
  declarations: [
    FeatureComponent,
  ]
})
export class FeatureModule { }
