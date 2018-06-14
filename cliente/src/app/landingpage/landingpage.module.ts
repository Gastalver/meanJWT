import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";

/*Rutas*/
import { LandingpageRoutingModule } from './landingpage-routing.module';

/*Componentes*/
import { LandingpageComponent } from './landingpage/landingpage.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    LandingpageRoutingModule
  ],
  declarations: [LandingpageComponent,]
})
export class LandingpageModule { }
