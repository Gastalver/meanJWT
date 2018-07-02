import { Component, OnInit } from '@angular/core';
import { Title} from "@angular/platform-browser";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public imagenes: string[];
  constructor(
    private _titulo: Title
  ) {
    this._titulo.setTitle('Mi Proyecto');
    this.imagenes = ['../../../assets/1080x675.jpg']

  }

  ngOnInit() {
    // console.log('Componente landingpage/carousel cargado.')
  }

}
