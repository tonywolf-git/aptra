import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5Page } from './tab5.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page
  },
  {
    path: 'tab5-home',
    loadChildren: () => import('./tab5-home/tab5-home.module').then( m => m.Tab5HomePageModule)
  },
  {
    path: 'tab5-correo',
    loadChildren: () => import('./tab5-correo/tab5-correo.module').then( m => m.Tab5CorreoPageModule)
  },
  {
    path: 'tab5-bitacora',
    loadChildren: () => import('./tab5-bitacora/tab5-bitacora.module').then( m => m.Tab5BitacoraPageModule)
  },
  {
    path: 'tab5-turnado',
    loadChildren: () => import('./tab5-turnado/tab5-turnado.module').then( m => m.Tab5TurnadoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5PageRoutingModule {}
