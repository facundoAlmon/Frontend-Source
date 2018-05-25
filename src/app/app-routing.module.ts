import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'dispositivos', loadChildren: 'app/dispositivos/dispositivos.module#DispositivosModule'
  },
  {
    path: 'graficos', loadChildren: 'app/graficos/graficos.module#GraficosModule'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
