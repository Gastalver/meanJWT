import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeatureComponent} from "./feature/feature.component";

const rutasFeature: Routes = [
  {path: 'privado1', component: FeatureComponent },];

@NgModule({
  imports: [RouterModule.forChild(rutasFeature)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
