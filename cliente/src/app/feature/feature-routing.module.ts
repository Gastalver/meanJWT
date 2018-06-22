import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeatureComponent} from "./feature/feature.component";
import { UsuarioGuard} from "../core/usuario.guard";

const rutasFeature: Routes = [
  {path: 'privado1', component: FeatureComponent, canActivate: [UsuarioGuard] },];

@NgModule({
  imports: [RouterModule.forChild(rutasFeature)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
