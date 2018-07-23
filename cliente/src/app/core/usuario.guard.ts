import { Injectable } from "@angular/core";
import { Router, CanActivate} from "@angular/router";
import { UsuarioService} from "./usuario.service";

@Injectable()
export class UsuarioGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _servicioUsuario: UsuarioService
  ){
  }
  canActivate(){
    let identidad = this._servicioUsuario.getIdentidad();
      // console.log('identidad='+identidad);
    if (identidad){
      if (identidad.rol == 'ROL_USUARIO' || identidad.rol == 'ROL_ADMINISTRADOR'){
        return true
      } else {
      this._router.navigate(['acceso'])
      }
    } else {
      this._router.navigate(['acceso'])
    }
  }
}
