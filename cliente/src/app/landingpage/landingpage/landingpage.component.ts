import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public imagenes: string[];
  constructor() {
    this.imagenes = ['../../../assets/1400x400.jpg','../../../assets/1400x400.jpg', '../../../assets/1400x400.jpg']
  }

  ngOnInit() {
  }

}
