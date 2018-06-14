import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public imagenes: string[];
  constructor() {
    this.imagenes = ['../../../assets/1080x675.jpg','../../../assets/1080x675.jpg', '../../../assets/1080x675.jpg']
  }

  ngOnInit() {
  }

}
