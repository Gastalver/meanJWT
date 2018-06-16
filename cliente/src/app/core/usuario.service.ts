//Singleton Service

import { Injectable, Optional } from '@angular/core';
import { Observable } from "rxjs/index";
import { HttpClient, HttpHeaders} from "@angular/common/http";

/*Modelo*/
import { Usuario} from "../modelos/usuario";
import {extractStyleParams} from "@angular/animations/browser/src/util";


@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceConfig {
  apiUrl = '';
}
export class UsuarioService {
  public apiUrl;

  constructor(
    @Optional() private config: UsuarioServiceConfig,
    public _http: HttpClient
  ) {
    if(config){
      this.apiUrl = config.apiUrl;
    }
  }

  /**
   * Guardar un usuario
   * @param usuario
   */
  registro(usuario: Usuario): Observable<any>{
    let enBody = JSON.stringify(usuario);
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(this.apiUrl + 'registro', enBody, {headers: cabeceras})
  }

}
