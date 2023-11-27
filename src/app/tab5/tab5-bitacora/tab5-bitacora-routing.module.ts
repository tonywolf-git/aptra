import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5BitacoraPage } from './tab5-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5BitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5BitacoraPageRoutingModule {}
