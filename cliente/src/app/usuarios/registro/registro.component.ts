import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";
import { Title } from "@angular/platform-browser";

/* Modelos */
import { Usuario} from "../../modelos/usuario";

/* Servicios */
import { UsuarioService} from "../../core/usuario.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [ UsuarioService ]
})
export class RegistroComponent implements OnInit {

  public titulo: string;
  public usuario: Usuario;
  public mensaje: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _servicioUsuario: UsuarioService,
    private _titulo: Title
  ) {
    this._titulo.setTitle('Registro');
    this.titulo = 'Registro';
    this.usuario = new Usuario(
      "",
      "",
      "",
      "",
      "",
      "",
      "ROL_USUARIO",
      "",
      ""
    );
    this.mensaje='';
  }

  ngOnInit() {
    // console.log('Componente usuarios/registro cargado.')
  }

  public onSubmit(formularioRegistro){
    this._servicioUsuario.registro(this.usuario).subscribe(
      (response)=>{
        if (response.usuario && response.usuario._id){
          this.status = 'Exito';
          console.log(response.usuario);
          formularioRegistro.reset();

        }else{
          this.status = "Fracaso";
          this.mensaje = response.mensaje;
        }

      },
      (error)=>{
        let mensajeError = <any>error;
        this.status = 'Fracaso';
        this.mensaje = 'Ha ocurrido un error en el servidor. Inténtelo más tarde.';
        console.log(mensajeError); // TODO Eliminar en producción.
      }
    )
  }

}
