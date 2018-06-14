//Singleton Service

import { Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceConfig {
  apiUrl = '/api';
}
export class UsuarioService {
  private apiUrl;

  constructor(@Optional() config: UsuarioServiceConfig) {
    if(config){
      this.apiUrl = config.apiUrl;
    }
  }
}
