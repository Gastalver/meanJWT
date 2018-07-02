import { Component, OnInit } from '@angular/core';
import { Title} from "@angular/platform-browser";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  constructor(
    private _titulo: Title
  ) {
    this._titulo.setTitle('Privado1');
  }

  ngOnInit() {
  }

}
