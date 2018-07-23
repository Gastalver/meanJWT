import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Title} from "@angular/platform-browser";

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
  public apiUrl: string;


  constructor(
    private _router: Router,
    private _servicioUsuario: UsuarioService,
    private _ruta: ActivatedRoute,
    private _servicioSubidaArchivos: UploadService,
    private _titulo: Title
  ) {
    this._titulo.setTitle('Mi Perfil')
    this.titulo = 'Actualizar mis datos';
    this.usuario = this._servicioUsuario.getIdentidad();
    this.identidad = this.usuario;
    this.token = this._servicioUsuario.getToken();
    this.status = null;
    this.mensaje = null;
    this.apiUrl = environment.apiUrl;
    this.archivosParaEnviar = [];

  }

  ngOnInit() {
    console.log('archivosParaEnviar: ' + JSON.stringify(this.archivosParaEnviar));
  }
  onSubmit(formularioEdicionUsuario){
    this._servicioUsuario.actualizarUsuario(this.usuario).subscribe(
      (response)=>{
        if (!response.usuario){
          this.status = 'Fracaso';
          this.mensaje = 'Ha ocurrido un error en el Servidor. Inténtelo más tarde.'
        }else{
          // Guardamos la identidad actualizada en el localStorage
          localStorage.setItem('identidad',JSON.stringify(this.usuario));
          this.status = 'Exito';
          // Sölo subimos archivo si hay un archivo para subir seleccionado
          if (this.archivosParaEnviar.length > 0){
            this._servicioSubidaArchivos.RequestConArchivos(this.apiUrl + '/usuarios/' + this.usuario._id + '/imagen',[],this.archivosParaEnviar,this.token,'imagenUsuario')
              .then(
                (resultado: any)=>{
                  this.status = 'Exito';
                  this.usuario.imagen = resultado.usuario.imagen;
                  localStorage.setItem('identidad',JSON.stringify(this.usuario));
                },
                (error)=>{
                  let respuesta = JSON.parse(error);
                  this.status = 'Fracaso';
                  if (respuesta.mensaje){
                    this.mensaje = respuesta.mensaje;
                  } else {
                    this.mensaje = 'Ha habido un problema con el archivo de imagen. Inténtelo de nuevo.'
                  }
                  this.archivosParaEnviar=[];
                }
              )
          }
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
}

  eventoCambioEnArchivosSeleccionados(archivosSeleccionados: any){
    this.archivosParaEnviar = <Array<File>>archivosSeleccionados.target.files;
    // console.log(this.archivosParaEnviar);

  }

  eliminaImagenUsuario(){
    this.usuario.imagen = null;
    this.archivosParaEnviar = [];
    // console.log(this.usuario)
  }
}
