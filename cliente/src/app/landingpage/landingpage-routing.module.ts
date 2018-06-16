import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarouselComponent} from "./carousel/carousel.component";
import { NoencontradoComponent } from "./noencontrado/noencontrado.component";

const rutasLandingPage: Routes = [
  { path: 'inicio', component: CarouselComponent},
  // { path: '', redirectTo: '/inicio', component: CarouselComponent},
  // { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
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
