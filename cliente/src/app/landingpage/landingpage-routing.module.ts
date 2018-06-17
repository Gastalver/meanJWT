import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent} from "./carousel/carousel.component";

const rutasLandingPage: Routes = [
  { path: 'inicio', component: CarouselComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(rutasLandingPage),
  ],
  exports: [
    RouterModule
  ]
})
export class LandingpageRoutingModule { }
