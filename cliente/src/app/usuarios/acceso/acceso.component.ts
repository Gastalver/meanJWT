import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title} from "@angular/platform-browser";

/* Modelos */
import { Usuario} from "../../modelos/usuario";

/* Servicios */
import { UsuarioService} from "../../core/usuario.service";

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css'],
  providers: [ UsuarioService]
})

export class AccesoComponent implements OnInit {
  public titulo: string;
  public usuario:Usuario;
  public status:string;
  public mensaje: string;
  public identidad: Usuario;
  public token:string;

  constructor(
    private _servicioUsuario: UsuarioService,
    private _router: Router,
    private _titulo: Title

  ) {
    this._titulo.setTitle('Acceso');
    this.titulo = "Acceso";
    this.usuario = new Usuario("","","","","","","","",null);
  }

  ngOnInit() {
    // console.log('Componente usuarios/acceso cargado.');
  }

  onSubmit(formularioAcceso){
    this.status = null;
    this.mensaje = '';
    //Primero pedirmos los datos del usuario, sin token. (Cfr. ruta en API)
    this._servicioUsuario.acceso(this.usuario).subscribe(
      (response)=>{
        this.identidad = response.usuario;
        // Comprobamos que han llegado los datos. ¡¡Son importantes!!
        if (!this.identidad || !this.identidad._id){
          this.status = "Fracaso";
          this.mensaje = "Disculpe ha habido un problema de autenticación. Sea tan amable de volver a introducir sus datos."
        } else {
        //  Conservamos de modo persistente los datos de usuario a modo de sesión.
          // Usamos localStorage para que estén disponibles localmente..
          // TODO Comprobar que localStorage está disponible en el agente.
          localStorage.setItem('identidad', JSON.stringify(this.identidad));
        //  Segundo pedimos el token, que también conservamos (ver pedirToken)
          this.pedirToken();
          this._router.navigate(['privado1']);

        }
      },
      (error)=>{
        let mensajeError = <any>error;
        this.status = 'Fracaso';
        if (error.error.mensaje){
          this.mensaje = error.error.mensaje;
        } else {
          this.mensaje = 'Ha ocurrido un error en el servidor. Inténtelo más tarde.';
        }
        console.log(mensajeError); // TODO Eliminar en producción.
        formularioAcceso.reset();
      }
    )
  }

  pedirToken(){
    //Primero pedirmos los datos del usuario, con token. (Cfr. ruta en API)
    this._servicioUsuario.acceso(this.usuario,"true").subscribe(
      (response)=>{
        this.token = response.token;
        // Comprobamos que han llegado los datos. ¡¡Son importantes!!
        if (this.token.length <=0){
          this.status = "Fracaso";
          this.mensaje = "Disculpe ha habido un problema de autenticación. Sea tan amable de volver a introducir sus datos."
        } else {
          //  Conservamos de modo persistente el token.
          localStorage.setItem('token', this.token);
        }

      },
      (error)=>{
        let mensajeError = <any>error;
        this.status = 'Fracaso';
        if (error.error.mensaje){
          this.mensaje = error.error.mensaje;
        } else {
          this.mensaje = 'Ha ocurrido un error en el servidor. Inténtelo más tarde.';
        }
        console.log(mensajeError) // TODO Eliminar en producción.
      }
    )
  }


}
