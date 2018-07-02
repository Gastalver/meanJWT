import { Component, OnInit } from '@angular/core';
import { Title} from "@angular/platform-browser";

@Component({
  selector: 'app-noencontrado',
  templateUrl: './noencontrado.component.html',
  styleUrls: ['./noencontrado.component.css']
})
export class NoencontradoComponent implements OnInit {

  constructor(
    private _titulo: Title
  ) {
    this._titulo.setTitle('404 Oops')
  }

  ngOnInit() {
  }

}
