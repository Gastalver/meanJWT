import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* Componentes */
import { CarouselComponent} from "./landingpage/carousel/carousel.component";
import { NoencontradoComponent} from "./landingpage/noencontrado/noencontrado.component";

/* Routing Module */

/* Rutas */
const rutasApp: Routes = [
  { path: '', redirectTo: 'inicio',pathMatch: 'full'},
  { path: '**', pathMatch: 'full', component: NoencontradoComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(rutasApp,
      {enableTracing: false})  // True muestra el lifecicle del routing en consola
  ],
  exports: [
    RouterModule
  ]
})


export class AppRoutingModule { }
