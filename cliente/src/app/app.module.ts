import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from '@angular/common/http'

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreServiciosModule} from "./core-servicios/core-servicios.module";
import { LandingpageModule} from "./landingpage/landingpage.module";

/* Routing module */
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreServiciosModule.forRoot({apiUrl: '/api'}),
    NgbModule.forRoot(),
    AppRoutingModule,
    LandingpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
