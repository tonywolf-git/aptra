import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab5TurnadoPage } from './tab5-turnado.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5TurnadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab5TurnadoPageRoutingModule {}
