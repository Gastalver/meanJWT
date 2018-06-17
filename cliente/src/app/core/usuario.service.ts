//Singleton Service

import { Injectable, Optional } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpHeaders} from "@angular/common/http";

/*Modelo*/
import { Usuario} from "../modelos/usuario";


@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceConfig {
  apiUrl = '';
}
export class UsuarioService {
  public apiUrl;
  public identidad;
  public token;

  constructor(
    @Optional() private config: UsuarioServiceConfig,
    public _http: HttpClient
  ) {
    if(config){
      this.apiUrl = config.apiUrl;
    }
  }

  /**
   * Registro de un usuario
   * @param {Usuario} usuario
   * @returns {Observable<any>}
   */
  registro(usuario: Usuario): Observable<any>{
    let enBody = JSON.stringify(usuario);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.apiUrl + 'registro', enBody, {headers: cabeceras})
  }

  /**
   * Acceso de un usuario.
   * @param {Usuario} usuario
   * @param {any} recibirToken
   * @returns {Observable<any>}
   */
  acceso(usuario: Usuario, recibirToken = null):Observable<any>{
    if(recibirToken != null){
      usuario.recibirToken = recibirToken;
    }

    let enBody = JSON.stringify(usuario);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.apiUrl + 'acceso', enBody, {headers: cabeceras})
  }

  /**
   * Recuperar identidad usuario desde localStorage.
   */
  getIdentidad(){
    let identidad = JSON.parse(localStorage.getItem('identidad'));
    if(identidad!=undefined){
      this.identidad = identidad;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }

  /**
   * Recuperar token de usuario desde localStorage.
   */
  getToken(){
    let token= localStorage.getItem('identidad');
    if(token!=undefined){
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('identidad');
  }


}
