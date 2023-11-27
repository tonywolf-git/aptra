import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosDescPage } from './avisos-desc.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosDescPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosDescPageRoutingModule {}
