import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from "@angular/router";
import { environment} from "../environments/environment";

/* Modelos */
import {Usuario} from "./modelos/usuario";

/* Servicios */
import {UsuarioService} from "./core/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent implements OnInit, DoCheck {
  public titulo:string;
  public identidad: Usuario;
  public token:string;
  public apiUrl:string;

  constructor(
    private _servicioUsuario:UsuarioService,
    private _router: Router,
  ){
    this.titulo = 'Mi proyecto';
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(){
    this.identidad = this._servicioUsuario.getIdentidad();
    this.token = this._servicioUsuario.getToken();
  }

  ngDoCheck(){
    this.identidad = this._servicioUsuario.getIdentidad();
  }

  cerrarSesion(){
    this._servicioUsuario.cerrarSesion();
    this.identidad = null;
    this.token = null;
    this._router.navigate(['/'])
  }

}
