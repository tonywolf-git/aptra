import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5CorreoPage } from './tab5-correo.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5CorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5CorreoPageRoutingModule {}
