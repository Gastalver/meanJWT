import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { Angular2FontawesomeModule} from "angular2-fontawesome";

/*Componentes*/
import { CarouselComponent} from "./carousel/carousel.component";
import { NoencontradoComponent } from './noencontrado/noencontrado.component';

/*Servicios*/

/*Rutas*/
import { LandingpageRoutingModule } from './landingpage-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    Angular2FontawesomeModule,
    LandingpageRoutingModule
  ],
  declarations: [
    CarouselComponent,
    NoencontradoComponent,
  ],
  providers: []
})
export class LandingpageModule { }
