import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosRoutingModule } from './graficos-routing.module';
import { GraficosComponent } from './graficos/graficos.component';

import { AppMaterialModule } from './../app-material/app-material.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    GraficosRoutingModule,
    AppMaterialModule,
    ChartsModule
  ],
  declarations: [GraficosComponent]
})
export class GraficosModule { }
