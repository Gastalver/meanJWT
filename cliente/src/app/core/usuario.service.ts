//Singleton Service

import { Injectable } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";

/*Modelo*/
import { Usuario} from "../modelos/usuario";


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public apiUrl;
  public identidad;
  public token;

  constructor(
    public _http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Registro de un usuario
   * @param {Usuario} usuario
   * @returns {Observable<any>}
   */
  registro(usuario: Usuario): Observable<any>{
    let enBody = JSON.stringify(usuario);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.apiUrl + '/usuarios/', enBody, {headers: cabeceras})
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
    return this._http.post(this.apiUrl + '/usuarios/acceso', enBody, {headers: cabeceras})
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
    let token= localStorage.getItem('token');
    if(token!=undefined){
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  /**
   * Cerrar sesion. Eliminar datos de localStorage
   */
  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('identidad');
  }

  /**
   * Actualizar datos de usuario.
   * @param {Usuario} usuario
   * @returns {Observable<any>}
   */
  actualizarUsuario(usuario:Usuario):Observable<any>{
  let enBody = JSON.stringify(usuario);
  let cabeceras = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization',this.getToken());
  return this._http.put(this.apiUrl + '/usuarios/' + usuario._id, enBody, {headers: cabeceras})
}


}
