import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService} from "./usuario.service";
import { UsuarioServiceConfig} from "./usuario.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    UsuarioService
  ]
})
export class CoreServiciosModule {
  constructor(@SkipSelf() @Optional() parentModule:CoreServiciosModule) {
    if (parentModule){
      throw new Error(
        'El módulo CoreServicios ya está cargado, importalo sólo en Modulo App'
      )
    }
  }

  static forRoot(config: UsuarioServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreServiciosModule,
      providers: [
        {provide: UsuarioServiceConfig, useValue: config }
      ]
    };
  }
}
