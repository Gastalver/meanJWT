import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { Angular2FontawesomeModule} from "angular2-fontawesome";

/* App root */
import { AppComponent } from './app.component';

/* App routing module */
import { AppRoutingModule } from './app-routing.module';

/* Feature modules */
import { CoreModule} from "./core/core.module";
import { LandingpageModule} from "./landingpage/landingpage.module";
import { UsuariosModule} from "./usuarios/usuarios.module";
import { FeatureModule} from "./feature/feature.module";

/* App components */


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    NgbModule.forRoot(),
    Angular2FontawesomeModule,
    LandingpageModule,
    UsuariosModule,
    FeatureModule,
    AppRoutingModule, // AppRouting en último lugar porque contiene la ruta default.
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
