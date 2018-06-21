// Véase: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest

import { Injectable, Optional } from '@angular/core';
import { environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  public apiUrl:string;
  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  RequestConArchivos(url:string, params:Array<string>, files: Array<File>, token:string, name:string){
    return new Promise(function(resolve,reject){
      var requestUrl = this.apiUrl + url;
      var formData: any = new FormData();

      var xhr = new XMLHttpRequest();

      for (var i=0; i<files.length;i++){
        formData.append(name,files[i],files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 ){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', requestUrl, true);

      xhr.setRequestHeader('Authorization', token);

      xhr.send(formData);

    })
  }


}
