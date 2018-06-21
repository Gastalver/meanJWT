import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

/* Modelos */
import {Usuario} from "../../modelos/usuario"; [ Usuario];

/* Servicios */
import { UsuarioService } from "../../core/usuario.service";
import { UploadService } from "../../core/upload.service";

@Component({
  selector: 'app-edicion-usuario',
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.css'],
  providers: [UsuarioService, UploadService]
})
export class EdicionUsuarioComponent implements OnInit {
  public titulo:String;
  public usuario: Usuario;
  public identidad;
  public token;
  public status: string;
  public mensaje: string;
  public archivosParaEnviar: Array<File>;


  constructor(
    private _router: Router,
    private _servicioUsuario: UsuarioService,
    private _ruta: ActivatedRoute,
    private _servicioSubidaArchivos: UploadService
  ) {
    this.titulo = 'Actualizar mis datos';
    this.usuario = this._servicioUsuario.getIdentidad();
    this.identidad = this.usuario;
    this.token = this._servicioUsuario.getToken();
    this.status = null;
    this.mensaje = null;

  }

  ngOnInit() {
    // console.log('EL componente usuarios/edicion-usuario se ha cargado.')
  }
  onSubmit(formularioEdicionUsuario){
    this._servicioUsuario.actualizarUsuario(this.usuario).subscribe(
      (response)=>{
        if (!response.usuario){
          this.status = 'Fracaso';
          this.mensaje = 'Ha ocurrido un error en el Servidor. Inténtelo más tarde.'
        }else{
          this.status = 'Exito';
          // Actualizamos datos identidad en localStorage
          localStorage.setItem('identidad', JSON.stringify(this.usuario));
          this.identidad = this.usuario;
          // Subida de imagen de archivo.
        }
      },
      (error)=>{
        let mensajeError = <any>error;
        this.status = "Fracaso";
        if (error.error.mensaje){
          this.mensaje = error.error.mensaje;
        }else {
          this.mensaje = 'Ha ocurrido un error en el Servidor. Inténtelo más tarde.'
        }

      }
    )
    // Suscribir respuesta.
    // Recibir nuevos datos usuario.
    // Actualizar identidad en localStorage ¿y token?
}

  eventoCambioEnArchivosSeleccionados(archivosSeleccionados: any){
    this.archivosParaEnviar = <Array<File>>archivosSeleccionados.target.files;
    console.log(this.archivosParaEnviar);
    this._servicioSubidaArchivos.RequestConArchivos('usuario/' + this.usuario._id + '/imagen',[],this.archivosParaEnviar,this.token,'imagen')
  }
}
