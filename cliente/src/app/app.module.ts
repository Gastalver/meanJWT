import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

/* App root */
import { AppComponent } from './app.component';

/* Feature modules */
import { CoreModule } from './core/core.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

/* Routing module */
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot({apiUrl: '/api'}),
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
