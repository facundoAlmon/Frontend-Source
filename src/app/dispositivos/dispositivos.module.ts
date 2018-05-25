import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispositivosRoutingModule } from './dispositivos-routing.module';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { DispositivoComponent } from './dispositivo/dispositivo.component';

import { AppMaterialModule } from './../app-material/app-material.module';


@NgModule({
  imports: [
    CommonModule,
    DispositivosRoutingModule,
    AppMaterialModule
  ],
  declarations: [DispositivosComponent, DispositivoComponent]
})
export class DispositivosModule { }
