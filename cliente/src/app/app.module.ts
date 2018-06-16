import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";

/* App root */
import { AppComponent } from './app.component';

/* App routing module */
import { AppRoutingModule } from './app-routing.module';

/* Feature modules */
import { CoreModule} from "./core/core.module";
import { LandingpageModule} from "./landingpage/landingpage.module";
import { UsuariosModule} from "./usuarios/usuarios.module";

/* App components */


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule.forRoot({apiUrl: 'http://localhost:3800/api/'}),
    NgbModule.forRoot(),
    LandingpageModule,
    UsuariosModule,
    AppRoutingModule, // AppRouting en último lugar porque contiene la ruta default.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
