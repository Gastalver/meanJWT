import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService} from "./usuario.service";
import { UsuarioGuard} from "./usuario.guard";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    UsuarioService,
    UsuarioGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule:CoreModule) {
    if (parentModule){
      throw new Error(
        'El módulo Core ya está cargado, importalo sólo en Modulo App'
      )
    }
  }
}
