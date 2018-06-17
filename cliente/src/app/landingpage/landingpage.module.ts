import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
    LandingpageRoutingModule
  ],
  declarations: [
    CarouselComponent,
    NoencontradoComponent,
  ],
  providers: []
})
export class LandingpageModule { }
