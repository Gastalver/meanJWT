import { Component, OnInit } from '@angular/core';

/* Modelos */
import { Usuario} from "../../modelos/usuario";

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {
  public titulo:string;

  constructor() {
    this.titulo = "Acceso"
  }

  ngOnInit() {
    console.log('Componente usuarios/acceso cargado.');
  }

}
