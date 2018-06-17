import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public imagenes: string[];
  constructor() {
    this.imagenes = ['../../../assets/1080x675.jpg']
  }

  ngOnInit() {
    console.log('Módulo landingpage/carousel/carousel cargado.')
  }

}
